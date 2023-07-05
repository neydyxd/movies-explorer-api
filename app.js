require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB_ADDRESS } = require('./utils/config');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS);

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', require('./routes/auth'));
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));
app.use((req, res, next) => {
    next(new NotFound('Страница по этому адресу не найдена'));
  });

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errors'));

app.listen(PORT, () => {
  console.log('serves is running on port 3000');
});


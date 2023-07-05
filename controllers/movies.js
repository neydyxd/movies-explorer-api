const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => console.log(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным id не найден');
    })
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        throw new ForbiddenError(
          'Недостаточно прав для удаления чужого фильма',
        );
      }
      Movie.findByIdAndRemove(req.params._id)
        .orFail(() => {
          throw new NotFoundError('Фильм с указанным id не найден');
        })
        .then(() => {
          res.send({ message: 'фильм успешно удален' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = {
    getMovies,
    createMovie,
    deleteMovie,
}
const messageError = {
  NOT_FOUND_ERROR: 'Такой страницы не существует.',
  INTERNAL_SERVER: 'Ошибка сервера !',
};

const messageErrorUser = {
  NOT_FOUND_USER: 'Пользователь по указанному _id не найден.',
  BAD_REQUEST_USER: 'Переданы некорректные данные.',
  BAD_CONFLICT: 'Пользователь с таким e-mail уже зарегестрирован',
  UNAUTHORIZED_USER: 'Указанные e-mail и пароль не верны',
  EMAIL_CONFLICT: 'Такой e-mail уже используется',
};
const messageErrorMovie = {
  BAD_REQUEST_MOVIE: 'Переданы некорректные данные.',
  NOT_FOUND_MOVIE: 'Фильм не найден.',
  FORBIDDEN_MOVIE: 'Нет прав для удаления фильма',
};

module.exports = { messageError, messageErrorUser, messageErrorMovie };

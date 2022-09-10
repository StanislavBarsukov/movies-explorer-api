require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { routes } = require('./routes/index');
const { errorHandler } = require('./error/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/express-rate-limit');

const app = express();
const { PORT = 3000, mongoDB = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
mongoose.connect(mongoDB);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => { });

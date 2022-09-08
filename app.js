require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { routes } = require('./routes/index');
const { errorHandler } = require('./error/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoDb } = require('./utils/const');
const { limiter } = require('./middlewares/express-rate-limit');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect(mongoDb);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => { });

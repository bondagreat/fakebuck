require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-route')
const friendRoute = require('./routes/friend-route')
const authenticateMiddleware = require('./middlewares/authenticate')
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: {message: 'too many request, please try again later'}
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute)
app.use('/users', authenticateMiddleware, userRoute)
app.use('/friends', authenticateMiddleware, friendRoute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.yellowBright.italic.bold(`Server running on port: ${port}`))
);

import express from 'express'
import config from './config/config.js'
import morgan from './config/morgan.js'
import helmet from 'helmet'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import errorHandler from './middlewares/error.js'
const app = express()

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());


app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));


// api logging
app.use(morgan)


// sanitize request data
app.use(mongoSanitize());

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
})
// error handling middleware
app.use(errorHandler);

  
export default app
  
// import modules -------------------------------------->
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.router.js';

// express app ----------------------------------------->
const app = express();

// express middleware ---------------------------------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware ----------------------------------->
app.use(express.static('public'));

// security middleware --------------------------------->
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

// check route ----------------------------------------->
app.get('/', (req, res) => {
    res.send('Server is ready.');
});

// router middleware ----------------------------------->
app.use('/api/v1/auth', authRoute);

// export module --------------------------------------->
export default app;

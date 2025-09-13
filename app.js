import express from 'express'
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
// import routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.json()); allows your app to parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); allows your app to parse URL-encoded request bodies. helps us to process the form data sent via HTML forms in a simple format
// app.use(cookieParser()); allows your app to parse cookies from incoming requests
// mount routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.use(errorMiddleware);



app.get('/', (req,res) => {
    res.send("Hello there");
});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
})

export default app;
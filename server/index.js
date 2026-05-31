import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());

// Enable CORS for the client dev server
app.use(cors({ origin: 'http://localhost:5173' }));
dotenv.config();

// Enable mongoose debug logging to view CRUD queries in server console
mongoose.set('debug', true);

const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGODB_URI;



mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})


app.use('/api', router);
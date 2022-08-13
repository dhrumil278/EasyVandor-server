import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
// import apiRoutes from './Routes/main-routes.js';
import userRoutes from './Routes/user.js';


// express app
const app = express();

// middlewaree
app.use(express.json({ limit:'30mb', extended: true}));
app.use(express.urlencoded({ limit: '30mb', extemded: true}));
app.use(cors());

// routes
app.use('/api/user', userRoutes);

// DataBase Connection 

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        // app Listenning
        app.listen(process.env.PORT, ()=> console.log(`Mongo DB is Connected Successfully and Server is running on port : ${process.env.PORT}`));
    })
    .catch((error)=>{
        console.log(error)
    })

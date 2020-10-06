const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');

dotenv.config();
//Connect to Db
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('Connected to Db')
)

//Middleware
app.use(express.json());


//Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, ()=> console.log('Server up and running'));
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connect to Db
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

mongoose.connect(
    `mongodb+srv://${user}:${password}>@cluster0.l5299.mongodb.net/${db_name}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log('Connected to Db')
)

//Import routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, ()=> console.log('Server up and running'));
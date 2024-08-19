const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const routesAccount = require('./src/routes/routesAccount')

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json())
app.use(routesAccount) 

app.listen(3000, () =>{
    console.log(`Server is running`);
})


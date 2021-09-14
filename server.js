const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'});
const app = express();
const db = require('./config/db');
db.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/api/user', userRoutes);



// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT${process.env.PORT}`);
})
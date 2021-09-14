const express = require('express');
require('dotenv').config({path:'./config/.env'});
const app = express();
const db = require('./config/db');
db.connect(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT${process.env.PORT}`);
})
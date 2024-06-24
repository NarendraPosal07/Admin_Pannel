const express = require('express');
const body_parser = require('body-parser');
const route = require('./route/route');
const mongoose = require('./db/dataconect');
const controller = require('./controller/controller');
const multer = require('multer');
const cookies_parser = require('cookie-parser')
const port = 5001;
const path = require('path');
const bcrypt = require('bcrypt');
let app = express();
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(cookies_parser())
app.use('/views/uploads', express.static('./views/uploads'));
app.use('/', route);
const userpath = multer();

mongoose

app.listen(port, () => {
    console.log("PORT 5001 IS RUNNING");
})
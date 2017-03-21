import express from 'express';
import mongoose from 'mongoose';

import fetchSquare from './src/apps/fetchSquare';
fetchSquare(new Date());

var app = express();

mongoose.connect('mongodb://localhost/test');

import router from './src/routers';
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(8000, function() {
   console.log("listening on port 8000");
})

export default app;

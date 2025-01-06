import Express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./Route/web";
import bodyParser from 'body-parser';
import connection from "./config/connectDB";
const { json } = require('express');
require("dotenv").config();
const app = Express();
//configViewengine
configViewEngine(app);


//config body-paser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection
connection();

//initwebroutes
initWebRoute(app);


const port = 8080;
app.listen(port, () => {
    console.log(`>>JWT bakcend running:`, port);
});
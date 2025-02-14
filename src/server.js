
require("dotenv").config();
import Express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./Route/web";
import initApiRoute from "./Route/api";
import bodyParser from 'body-parser';
import connection from "./config/connectDB";
import configCors from "./config/cors";
import JWTAction from "./midlleware/JWTAction";
import cookieParser from 'cookie-parser';
const { json } = require('express');

const app = Express();
const port = process.env.PORT || 8080;
//configViewengine
configViewEngine(app);
//configCors
configCors(app)
//config body-paser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser())

//test connection
connection();

//initwebroutes
initWebRoute(app);

//initapiroutes
initApiRoute(app)




app.listen(port, () => {

    console.log(`>>JWT bakcend running:`, port);

});
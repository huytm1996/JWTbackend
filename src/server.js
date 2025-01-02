import Express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./Route/web";

const app = Express();
//configViewengine
configViewEngine(app);
//initwebroutes
initWebRoute(app);

const port = 8080;
app.listen(port, () => {
    console.log(`>>JWT bakcend running:`, port);
});
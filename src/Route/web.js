import express from "express";
import homeController from '../Controller/homeController';
/**
 * app: express app
 */
const router = express.Router();
const initWebRoute = (app) => {
    router.get("/", homeController.hanldeHelloword);
    router.get("/user", homeController.hanldeUsePage);
    return app.use("/", router);
}
export default initWebRoute;
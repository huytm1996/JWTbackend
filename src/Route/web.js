import express from "express";
import homeController from '../Controller/homeController';
import apiController from '../Controller/apiController';
/**
 * app: express app
 */
const router = express.Router();
const initWebRoute = (app) => {
    router.get("/", homeController.hanldeHelloword);

    router.post("/users/create", homeController.hanldeCreateUser);
    router.post("/delete-user/:id", homeController.hanldeDeleteuser);
    router.get("/editview-user/:id", homeController.hanldeEditVieweUser);
    router.post("/editview-user", homeController.hanldeEditUser);
    router.get("/testapi", apiController.testApi);

    return app.use("/", router);
}
export default initWebRoute;
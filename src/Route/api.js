import express from "express";

import apiController from '../Controller/apiController';
/**
 * app: express app
 */

const testMidlleware = (req, res, next) => {

    next();
}
const router = express.Router();
const initApiRoute = (app) => {

    router.post("/register", apiController.hanldeRegister);
    router.post("/login", apiController.haldeLogin);
    router.get("/user/getalluser", testMidlleware, apiController.handeGetAllUser);
    router.post("/user/createuser", apiController.handeCreateUser);
    router.post("/user/deleteuser", apiController.handeDeleteUser);
    router.post("/user/edituser", apiController.handeEditUser);
    return app.use("/api/v1", router);
}
export default initApiRoute;
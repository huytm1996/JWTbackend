import express from "express";
/**
 * app: express app
 */
const router = express.Router();
const initWebRoute = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello");
    });
    return app.use("/", router);
}
export default initWebRoute;
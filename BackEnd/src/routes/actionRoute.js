import express from "express"
import actionController from "../controllers/actionController"
import middlewareController from "../controllers/middlewareController"

let router = express.Router();

const actionRoute = (app) => {
    router.get("/", middlewareController.verifyToken, actionController.action)

    return app.use("/action", router);
};

export default actionRoute;

import express from "express"
import authController from "../controllers/authController"
import middlewareController from "../controllers/middlewareController"

let router = express.Router();

const authRoute = (app) => {
    router.post('/signUp', authController.signUp)
    router.post('/signIn', authController.signIn)
    router.get('/refresh', authController.refresh)
    router.get('/signOut', middlewareController.verifyToken, authController.signOut)

    return app.use("/", router);
};

export default authRoute;
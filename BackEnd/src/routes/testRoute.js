import express from "express"

let router = express.Router();

let initTestRoute = (app) => {
    router.get("/", (req, res) => {
        res.send("hello")
    })

    return app.use("/", router);
};

export default initTestRoute;

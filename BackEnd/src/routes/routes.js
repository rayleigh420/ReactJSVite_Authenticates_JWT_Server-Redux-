import authRoute from "./authRoute";
import actionRoute from "./actionRoute";

let initRoutes = (app) => {
    authRoute(app)
    actionRoute(app)
};

export default initRoutes;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import initRoutes from "./routes/routes.js";
import credentials from './middleware/credenticals'
import corsOptions from './config/corsOptions'

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(credentials);

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "http://localhost:5173"
//   );

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

mongoose.connect(process.env.MONGOOSE_URL, () => {
  console.log("Connect Mongoose Databse success!");
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.listen(port, () => {
  console.log(`-------------Web is listening on port ${port}------------`);
});

import express from "express";
import { APP_PORT, DB_URL } from "./config";
import Errorhandler from "./middlewares/Errorhandler";
const app = express();
import routes from "./routes";
import mongoose from "mongoose";

mongoose.connect(DB_URL, () => {
  console.log("Connected to database");
});

app.use(express.json());
app.use("/api", routes);
app.use(Errorhandler);

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
});

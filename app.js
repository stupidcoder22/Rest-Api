import express from "express";
import { APP_PORT } from "./config";
import Errorhandler from "./middlewares/Errorhandler";
const app = express();
import routes from "./routes";

app.use(express.json());
app.use("/api", routes);
app.use(Errorhandler);

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
});

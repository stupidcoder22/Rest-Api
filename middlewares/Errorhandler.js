import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomErrorhandling from "../services/CustomErrorhandling";

const Errorhandler = (err, req, res, next) => {
  let statuscode = 500;
  let data = {
    message: "Internal Server Error",
    ...(DEBUG_MODE === "true" && { originalerror: err.message }),
  };

  if (err instanceof ValidationError) {
    statuscode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorhandling) {
    statuscode = err.status;
    data = {
      message: err.message,
    };
  }
  return res.status(statuscode).json(data);
};

export default Errorhandler;

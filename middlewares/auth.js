import CustomErrorhandling from "../services/CustomErrorhandling";
import Jwtservice from "../services/Jwtservice";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorhandling.unauthorized());
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id, role } = Jwtservice.verify(token);
    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorhandling.unauthorized());
  }
};

export default auth;

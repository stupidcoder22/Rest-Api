import User from "../../models/User";
import CustomErrorhandling from "../../services/CustomErrorhandling";

const userController = {
  async identity(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt -__v"
      );

      if (!user) {
        return next(CustomErrorhandling.notFound());
      }
      res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};

export default userController;

import Joi from "joi";
import User from "../../models/User";
import CustomErrorhandling from "../../services/CustomErrorhandling";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import Jwtservice from "../../services/Jwtservice";

const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorhandling.wrongCredential());
      }

      //compare password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorhandling.wrongCredential());
      }
      //generate token
      const access_token = Jwtservice.sign({
        _id: user._id,
        role: user.role,
      });

      res.json({ access_token });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;

import Joi from "joi";
import User from "../../models/User";
import CustomErrorhandling from "../../services/CustomErrorhandling";
import bcrypt from "bcrypt";
import Jwtservice from "../../services/Jwtservice";

const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(19).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repassword: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    //check if user in database
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorhandling.alreadyExist("This email is already taken")
        );
      }
    } catch (error) {
      return next(error);
    }

    const { name, email, password } = req.body;
    //hash password
    const hashpassword = await bcrypt.hash(password, 10);

    //prepare model
    const user = new User({
      name,
      email,
      password: hashpassword,
    });
    let access_token;
    try {
      const result = await user.save();

      //token
      access_token = Jwtservice.sign({ _id: result._id, role: result.role });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token: access_token });
  },
};

export default registerController;

import Joi from "joi";

const registerController = {
  register(req, res, next) {
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

    res.json({ msg: "success" });
  },
};

export default registerController;

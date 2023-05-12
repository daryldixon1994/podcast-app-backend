const Joi = require("joi");

const RegisterValidation = (data) => {
  const schema = Joi.object({
    adminName: Joi.string().empty().required().min(4).messages({
      "string.empty": "AdminName should not be an empty field",
      "string.base": "AdminName must be a string",
      "string.min": "AdminName length must be at least 4 characters long",
      "any.required": "AdminName is a required field",
    }),
    email: Joi.string()
      .empty()
      .required()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "Email cannot be an empty field.",
        "string.email": "Your email must be a valid email.",
        "any.required": "Email is a required field.",
      }),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*/])(?=.{8,})"
        )
      )
      .messages({
        "string.min": "Password length must be at least 8 characters.",
        "any.required": "Password is a required field.",
        "string.pattern.base":
          "Password must contains at least one lower character, one upper character, one digit character and one specific caracter. Exemple : Abcdef126#",
      }),
    confirm_password: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({
        messages: {
          "any.only": "Confirm password does not match.",
          "any.required": "Please confirm your password.",
        },
      }),
  });
  return schema.validate(data);
};

module.exports.RegisterValidation = RegisterValidation;

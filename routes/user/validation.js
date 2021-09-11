const Joi = require("joi");
// Joi validation package 
const RegisterValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
            })
            .messages({
                "string.empty": "email cannot be an empty field",
                "string.email": "email must be a valid email",
                "string.required": "email is a required field",
            }),
        password: Joi.string()
            .min(8)
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .options({
                messages: {
                    "string.min":
                        "Password length must be at least 8 characters",
                    "string.required": "password is a required field",
                },
            }),

        repeat_password: Joi.any()
            .equal(Joi.ref("password"))
            .required()
            .label("Confirm password")
            .options({
                messages: { "any.only": "Confirm password does not match" },
            }),
    });
    return schema.validate(data);// 
};

module.exports.RegisterValidation = RegisterValidation;

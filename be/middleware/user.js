import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Tên không được để trống",
        "string.empty": "Tên không được để trống"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email không được để trống",
        "string.empty": "Email không được để trống",
        "string.email": "Email không hợp lệ"
    }),
    phone: Joi.number().required().messages({
        "any.required": "Số điện thoại không được để trống",
        "number.empty": "Số điện thoại không được để trống"
    }),
    password: Joi.string().required().min(6).messages({
        "any.required": "Mật khẩu không được để trống",
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu không được ít hơn 6 kí tự"
    }),
    avatar: Joi.string().optional().messages({
        "string.empty": "Avatar không được để trống"
    })
});

export const checkValidateUser = (req, res, next) => {
    const { name, email, phone, password, avatar } = req.body;
    const { error } = userSchema.validate({ name, email, phone, password, avatar });

    if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
    } else {
        next();
    }
}

import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Tên không được để trống",
        "string.empty": "Tên không được để trống"
    })
});

export const checkValidateCategory = (req, res, next) => {
    const { name} = req.body;
    const { error } = categorySchema.validate({ name});

    if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
    } else {
        next();
    }
}

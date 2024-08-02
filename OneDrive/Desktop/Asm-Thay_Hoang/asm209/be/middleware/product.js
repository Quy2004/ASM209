import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Tên không được để trống",
        "string.empty": "Tên không được để trống"
    }),


    price: Joi.number().required().min(1000).messages({
        "any.required": "Giá không được để trống",
        "number.min": "Giá không được nhỏ hơn 1000"
    })
});

export const checkValidateProduct = (req, res, next) => {
    const { name, price } = req.body;
    const { error } = productSchema.validate({ name, price });

    if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
    } else {
        next();
    }
}

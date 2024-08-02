
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // images: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, // Liên kết với bảng Image
    images: { type: String },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', productSchema);

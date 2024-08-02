import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    image1: { type: String, required: true }
}, {
    timestamps: true
}); 

export const Image = mongoose.model('Image', imageSchema);

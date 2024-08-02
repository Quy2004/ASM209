import mongoose from "mongoose";

const categorySchema= new mongoose.Schema({
    name:String,
})


export const categoryModel=mongoose.model('categorys', categorySchema)
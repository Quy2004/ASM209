
import { categoryModel } from './../models/category.js';
// add-----------------------------------------
export const addCategory= async (req,res)=>{
    const category = await new categoryModel(req.body).save();
    res.send({status: true, data:category});    
}
// get ----------------------------------------------------------
export const getCategory=async(req,res)=>{
    try {
        const page= req.query.page;
        const limit= req.query.limit;
            const responsive= await categoryModel.find().skip((page-1)*limit).limit(limit);
                res.status(200).send(responsive)
    } catch (error) {
        res.status(503).send({status: false, message: "loi"+error})
    }
}
// get by ID -----------------------------------
export const getById= async (req, res)=>{
    const id = req.params.id;
    const respon = await categoryModel.findById(id);
    res.json(respon);
}

// delete--------------------------------------
export const deleteCategory=async(req,res)=>{
    const id = req.params.id;
    const response = await categoryModel.findOneAndDelete({_id:id});
    res.send(response)
}

// edit-----------------------------------------
export const putCategory=async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const response = await categoryModel.findOneAndUpdate({_id:id},body,{new:true});
    res.send(response)
}
import UserModel from "../models/user.js";

export const getUser=async(req,res)=>{
    try {
        const page= req.query.page;
        const limit= req.query.limit;
            const responsive= await UserModel.find().skip((page-1)*limit).limit(limit);
                res.status(200).send(responsive)
    } catch (error) {
        res.status(503).send({status: false, message: "loi"+error})
    }
}

// get by ID -----------------------------------
export const getById= async (req, res)=>{
    const id = req.params.id;
    const respon = await UserModel.findById(id);
    res.json(respon);
}

// add-----------------------------------------
export const addUser= async (req,res)=>{
    const users = await new UserModel(req.body).save();
    res.send({status: true, data:users});    
}

// delete--------------------------------------
export const deleteUser=async(req,res)=>{
    const id = req.params.id;
    const response = await UserModel.findOneAndDelete({_id:id});
    res.send(response)
}

// edit-----------------------------------------
export const putUser=async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const response = await UserModel.findOneAndUpdate({_id:id},body,{new:true});
    res.send(response)
}
const User = require("../models/user-model");
const Contact = require("../models/contact-model");

//user data get part
const getAllUsers = async (req, res) =>{

    try{
        const users = await User.find({}, {password:0});
        console.log(users);
        if(!users || users.length===0){
        res.status(404).json({message: "No users found"})

        }
        return res.status(200).json(users)

    }catch(error){
        next(error);
    }
};

//add members
const getUserById = async (req, res)=>{
    try{
        const id = req.params.id;
        const data =  await User.findOne({_id: id}, {password:0});
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
}

//update the user data
const updateUserById = async (req, res)=>{
    try{
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne(
            {_id:id},
            {
            $set: updateUserData,
        });
        return res.status(200).json(updatedData);
    }catch(error){
        // next(error);
        console.log(error);
    }
}

//user delete part
const deleteUserById = async (req, res)=>{
    try{
        const id = req.params.id;
         await User.deleteOne({_id:id});
        return res.status(200).json({message: "User deleted successfuly"});
    }catch(error){
        next(error);
    }
}

//contact part 
const getAllContacts = async (req, res)=>{
    try{
        const contacts = await Contact.find();
        console.log(Contact);
        if(!contacts || contacts.length===0){
            res.status(404).json({message: "No contacts found"})
            }
        return res.status(200).json(contacts);

    }catch(error){
        next(error);
    }

}

module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById};
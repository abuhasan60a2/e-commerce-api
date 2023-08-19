//modular scaffolding
const {makeConnection, closeConnection} = require('../DatabaseConnection');
const User = require('../models/User');
const userController = {};
userController.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            message: 'success',
            result:{
                ...users
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }

    
}
userController.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
    
}
userController.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
userController.updateUser = async (req, res) => {
   try{
   const newUserData =  await User.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
            user: newUserData,
            
        }
    })
   }
   catch(error){
         res.status(400).json({
              status: 'fail',
              message: error.message
         });
   }
}
userController.deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message
        })
    }
}
module.exports = userController;
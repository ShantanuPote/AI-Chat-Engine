const userModel = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

async function registerUser(req, res){
    const {email, fullName:{firstName, lastName}, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if(isUserAlreadyExists){
        return res.status(401).json({ message: "user already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName: {
            firstName, 
            lastName
        },
        email,
        password: hashPassword
    })

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            _id: user._id,
            fullName: user.fullName
        }
    })
}

async function loginUser( req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        res.status(400).json({message : "unauthorized"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        res.status(400).json({message : "Invalid Password"})
    }

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);

    res.cookie("token",token)

    res.status(201).json({
        message:"User login successfully",
        user :{
            email: user.email,
            _id: user._id,
            fullName: user.fullName
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}
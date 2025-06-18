import {userModel} from '../models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser=async(req,res)=>{
    const{email,password}=req.body
    
    try{
        const user=await userModel.findOne({email})
        if(!user){
            return res.send({success:false,message:"user doesn't exist"})
        }
        //here error can happen bcoz we have saved hashed password,nope bcrypt used here to decode.
        const isMatch=await bcrypt.compare(password,user.password)
        //we compared hashed password stored in database user.password and req.body password passed by user.bcrypt will extract salt from hashed password automatically.

        if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }

        const token=createToken(user._id)
        res.send({success:true,token:token})

    }catch(e){
        console.log(e)
        res.send({success:false,message:"Error while login"})
    }

}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser=async(req,res)=>{
  const{name,password,email}=req.body

  try{
    const exist=await userModel.findOne({email})
    if(exist){
        return res.send({success:false,message:"User already exist"})
    }
    //validating email and password for new user
    if(!validator.isEmail(email)){
        return res.send({success:false,message:"Email is not valid"})
    }

    //if above are not invoked then
    if(password.length<8){
        return res.send({success:false,message:"Please enter a strong password"})
    }
    //password encryption if nothing is wrong in above cases
    const salt=await bcrypt.genSalt(10)
    const hashedPass= await bcrypt.hash(password,salt)

    const newUser= new userModel({
        name:name,
        email:email,
        password:hashedPass
    })
    //storing saved user in mongodb and user variable too
    const user=await newUser.save()
    const token=createToken(user._id)
    res.send({success:true,token:token})

  }catch(e){
    console.log(e)
    res.send({success:false,message:"There is an issue"})
  }
}

export {loginUser,registerUser}
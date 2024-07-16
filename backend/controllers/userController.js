import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user
const loginUser = async (req,res)=>{

    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"No User Found"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token,name:user.name});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error while login"})
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
   }

//register user
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        //checking user exist
            const exist = await userModel.findOne({email});
            if(exist){
                return res.json({success:false, message:"User already exist"})
            }

            //validating email and strong password
            if(!validator.isEmail(email)){
                return  res.json({success:false, message:"Invalid email"})
            }

            if(password.length<8){
                return  res.json({success:false, message:"Enter Strong Password"})
            }

            //encrypt password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser = new userModel({
                name:name,
                email:email,
                password:hashedPassword
            })

           const user = await newUser.save();
            const token = createToken(user._id);
         res.json({success:true,token,name:user.name})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error creating user"})
    }
}

export {loginUser,registerUser};
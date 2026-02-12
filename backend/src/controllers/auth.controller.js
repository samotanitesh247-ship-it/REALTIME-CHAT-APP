import User from "../models/user.model.js";                                            // import the model we created in models file;
import bcrypt from "bcryptjs";                                                         // this present in the package.json for hashing the password and store in database;
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req,res)=>{                                               //here we build the signup flow for login page;
    const {fullName,email,password} = req.body; 
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ message:"All fields are required"});
        }

        if(password.length < 6){                                                       //check the password length;
            return res.status(400).json({ message:"password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});
        if(user){                                                                      //check if the email exists or not;
            return res.status(400).json({ message:"email already exists"});
        }

        const salt = await bcrypt.genSalt(10);   
        const hashedPassword = await bcrypt.hash(password,salt);                       //hashing the password;

        const newUser = new User({                                                     //take the data now we generate jwt token for user;
            fullName,
            email,
            password: hashedPassword,
        });
        if(newUser){                                                                   //we create a generate function in lib folder and utils.js file for keep code clean;
            generateToken(newUser._id,res)                                             //imported the function
            await newUser.save();                                                      //store the data in database
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message:"Invalid user data"});
        }
        
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({ message:"Internal server error"});             
    }
};

export const login = async (req,res)=>{
      const { email, password } = req.body;
    try {
        const user = await User.findOne({email});                                     //search the email in database

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);       //compare the password with the existing password
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);                                                  //if password is correct generates the token

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

        
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({message: "Internal server error"});   
    }
    
};

export const logout = (req,res)=>{
    try {
        res.cookie("jwt"," ",{maxAge:0});
        res.status(200).json({message:"Loggedout successfully"});    
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({message: "Internal server error"});       
    }
};

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId ,{profilePic:uploadResponse.secure_url},{new:true});

        res.status(200).json(updatedUser);
         
    } catch (error) {
        console.log("error in updateProfile controller",error.message);
        res.status(500).json({message: "Internal server error"});
        
    }

};

export const checkAuth = (req,res)=>{                         //we gonna call this function when we refresh our page it will check user is authincted or not
    try {
        if(!req.user){
            return res.status(401).json({message:"User not found in request"});
        }
        res.status(200).json(req.user);   
    } catch (error) {
        console.log("error in checkAuth controller",error.message);
        res.ststus(500).json({message: "Internal server error"});     
    }
};
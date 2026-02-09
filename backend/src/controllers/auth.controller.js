import User from "../models/user.modal.js";                                            // import the model we created in models file;
import bcrypt from "bcryptjs";                                                         // this present in the package.json for hashing the password and store in database;
import { generateToken } from "../lib/utils.js";


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
        res.status(500).json({message:"Internal server error"});      
    }
};

export const login = (req,res)=>{
    res.send("login route");
};

export const logout = (req,res)=>{
    res.send("logout route");
};
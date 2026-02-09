import mongoose from "mongoose";

// This is the model for the user in database that shows what user requires
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },         
    },
    { timestamps : true }   
);

const User = mongoose.model("User", userSchema); //in User or anything - first letter should always be in capital.
export default User;

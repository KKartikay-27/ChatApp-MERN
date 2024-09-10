import bcrypt from "bcryptjs";
import User from "../models/user.Model.js";

export const signup = async (req,res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
          
        if(password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        //HASH password here

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //https://avatar.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/image?username=${username}`;

        if(newUser){

            //Generate JWT token here
            

            const newUser = new User({
                fullName,
                username,
                password : hashedPassword,
                gender,
                profilePic : gender === "male" ? boyProfilePic : girlProfilePic
            });
        }else{
            res.status(400).json({message: "Invalid user data"});
        }

        await newUser.save();

        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            username : newUser.username,
            profilePic : newUser.profilePic
        });

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error: "Internal Server Error"}); 
    }
};

export const loginUser = (req,res) => {
    console.log("Login User");
};

export const logoutUser = (req,res) => {
    console.log("Logout User");
};
 
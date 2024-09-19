import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
          
        if(password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }

        let user;
        try {
            user = await User.findOne({username});
        } catch (error) {
            console.log("Error connecting to the database", error.message);
            return res.status(500).json({error: "Database connection error"});
        }

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        //HASH password here

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //https://avatar.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/image?username=${username}`;
        
        const newUser = new User({
                fullName,
                username,
                password : hashedPassword,
                gender,
                profilePic : gender === "male" ? boyProfilePic : girlProfilePic
            });
        
        if(newUser){
            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic
            });
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error: "Internal Server Error"}); 
    }
};

export const loginUser = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({error: "Invalid Username or Password"});
        }

        const isPasswordCorrect = (await bcrypt.compare(password, user.password));
        
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid Password"}); 
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            username : user.username,
            profilePic : user.profilePic
        });

    } catch (error) {
        console.log("Error in loginUser controller",error.message);
        res.status(500).json({error: "Internal Server Error"}); 
    }
};

export const logoutUser = (req,res) => {
    try {
        res.cookie('jwt',"",{
            maxAge: 0
        });
        res.status(200).json({message: "Logged Out Successfully"});
    } catch (error) {
        console.log("Error in logoutUser controller",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

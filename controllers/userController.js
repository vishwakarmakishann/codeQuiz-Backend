const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, resp)=>{
    try {
        const {username, password, role} = req.body;
        const user = await userModel.findOne({username});
        if(user){
            return resp.status(409).json({message:"User already exist"});
        }
        const hashPass = await bcrypt.hash(password, 10);
        await userModel.create({username, password:hashPass, role});
        return resp.status(201).json({message:"Registered"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.login = async (req, resp) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.username = username;
            req.session.role = user.role;
            req.session.save(err => {
                if (err) {
                    console.error("Session save error:", err);
                    return resp.status(500).json({ message: "Session could not be saved" });
                }
                console.log("After login session value: ",req.session);
                return resp.status(200).json({ message: "Logged In", username, role: user.role });
            });
        } else {
            return resp.status(401).json({ message: "Incorrect username or password" });
        }
    } catch (error) {
        console.log(error);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
};

exports.logout = async (req, resp)=>{
    try {
        if(req.session.username){
            req.session.destroy();
            return resp.status(200).json({message:"Logged out"});
        }
        return resp.status(400).json({message:"Already logged out"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.getUsers = async (req, resp)=>{
    try {
        const users = await userModel.find();
        if(users){
            return resp.status(200).json(users);
        }
        return  resp.status(400).json({message:"No user found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.delUser = async (req, resp)=>{
    try {
        const user = await userModel.findById(req.params.id);
        if(user){
            await userModel.findByIdAndDelete(req.params.id);
            return resp.status(200).json({message:"User deleted"});
        }
        return resp.status(400).json({message:"User not found"});
    } catch (error) {
        console.log(error);
        
    }
}

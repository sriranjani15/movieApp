const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = 'fa9b5f6f1973daa6322615629e50f762bd6b013f2827c0557e45100f2a772d91813a78';

exports.register = async (req,res,next)=>{
    const {email,password} = req.body;
    if(password.length<6){
        return res.status(400).json({message:"Password less than 6 characters"})
    }
    const u = await user.findOne({email});
    if(u){
        res.status(401).json({
            message:"User Already Present",
            error:"user already present",
        })
    }
    else {
        bcrypt.hash(password,10).then(async (hash)=>{
        await user.create({
            email,
            password:hash,
        }).then(u=>{
            const maxAge = 3*60*60;
            const token = jwt.sign(
                {id:u._id,email},
                jwtSecret,
                {
                    expiresIn:maxAge,
                }
            ); 
            res.cookie("jwt",token,{
                httpOnly:true,
                maxAge:maxAge*1000,
            });
            res.status(200).json({
                message:"user successfully created",
                u,
            })
        }).catch ((err) => {
            res.status(401).json({
                message:"user not successfully created",
                error:err.message,
            })
        });
        })}
 };

exports.login = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"email or password not present",
        })
    }
    try {
        const u = await user.findOne({email});
        if(!u){
            res.status(401).json({
                message:"Login not Successful",
                error:"user not found",
            })
        } else {
            bcrypt.compare(password,u.password).then(function(result){
               if(result){
                const maxAge = 3*60*60;
                const token = jwt.sign(
                    {id:u._id,email},
                    jwtSecret,
                    {
                        expiresIn:maxAge,
                    }
                );
                res.cookie("jwt",token,{
                    httpOnly:true,
                    maxAge:maxAge*1000,
                });
                   res.status(200).json({
                    message:"Login Successful",
                    u,
                });
            }
               else{ res.status(400).json({message:"Login not Successful"})
            
        }})
        }
    } catch (error){
        res.status(400).json({
            message:"An error occured",
            error:error.message,
        })
    }
};


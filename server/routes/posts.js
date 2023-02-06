import express from 'express'
const router=express.Router();
import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'

import Post from '../models/Post.js'

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

router.route('/').get(async (req,res,next)=>{
    try{
    const posts=await Post.find({})
    return res.status(200).json({success:true,data:posts})
    }catch(err) {
        return res.status(500).json({success:false,message:err})
    }
}).post(async(req,res,next)=>{
    const {name,prompt,image}=req.body;
    try {
        const cloudinary_image=await cloudinary.uploader.upload(image);
         const post=await Post.create({
            name,
            prompt,
            photo:cloudinary_image.url
         })
         return res.status(201).json({success:true,data:post})
    }catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
    



})

export default router;



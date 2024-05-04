import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'

import Post from '../models/post.js'

const router = express.Router()
          
cloudinary.config({ 
  cloud_name: 'dwpdwkw5h', 
  api_key: '139467398329675', 
  api_secret: '1GYLXjHmHmY5xDNcKtbfu2P86OU' 
});

router.route('/').get(async(req,res)=>{
    try{
        const posts= await Post.find({})

        res.status(200).json({success:true , data: posts})
    }catch(error){
        res.status(200).json({success:true , message :error})
    }

})

router.route('/').post(async(req,res)=>{
    try{
        const {name, prompt, photo} = req.body
        const PhotoUrl = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({
            name,
            prompt,
            photo: PhotoUrl.url,
        })
        res.status(201).json({success:true , data: newPost})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false , message: error})
    }
})

export default router
import express from 'express'
const router=express.Router();
import dotenv from 'dotenv'
import {Configuration,OpenAIApi} from 'openai'

dotenv.config();

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})

const openai=new OpenAIApi(configuration)

router.route('/').post(async(req,res)=>{
    const {prompt}=req.body;

    try{
    const data=await openai.createImage({
        prompt,
        n:1,
        size:'1024x1024',
        response_format:'b64_json'
    })
    const image=data.data.data[0].b64_json;
    return res.status(200).json({photo:image})
    }catch(err) {
        return res.status(500).json({err})
    }
})

export default router;
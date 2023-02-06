import mongoose from 'mongoose'

const PostSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    prompt:{
        type:String,
        required:[true,'Please add a prompt']
    },
    photo:{
        type:String,
        required:[true,'Please add a photo']
    },
})

export default mongoose.model('Post',PostSchema);
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String, required:true, trim:true,maxLength:80},
    //{type:String}이라고 해도 됨.
    description: {type:String, required:true, trim:true,minLength:20},
    createdAt: {type:Date, required:true,default:Date.now},
    hashtags:[{ type: String, trim:true, trim:true, trim:true, trim:true, trim:true, trim:true, trim:true}],
    //배열로 만든 것.
    meta:{
        views:{type:Number, default:0, required:true},
        rating:{type:Number, default:0, required:true},
    },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;



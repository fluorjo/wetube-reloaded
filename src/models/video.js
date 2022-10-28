import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String, 
    //{type:String}이라고 해도 됨.
    description: String,
    createdAt: Date,
    hashtags:[{ type: String}],
    //배열로 만든 것.
    meta:{
        views:Number,
        rating:Number,
    },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;



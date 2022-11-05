import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String, required:true, trim:true,maxLength:80},
    fileUrl:{type:String,required:true}, 
    //{type:String}이라고 해도 됨.
    description: {type:String, required:true, trim:true,minLength:0},
    createdAt: {type:Date, required:true,default:Date.now},
    hashtags:[{ type: String, trim:true, trim:true, trim:true, trim:true, trim:true, trim:true, trim:true}],
    //배열로 만든 것.
    meta:{
        views:{type:Number, default:0, required:true},
        rating:{type:Number, default:0, required:true},
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"
    },
});

videoSchema.static('formatHashtags', function (hashtags){
    return hashtags
    .split(",")
    .map((word)=>(word.startsWith('#') ? word : `#${word}`));
})

const Video = mongoose.model("Video", videoSchema);
export default Video;



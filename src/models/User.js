import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    avatarUrl:String,
    socialOnly: { type: Boolean, default: false },
    username: {type:String, required:true, unique:true},
    name: {type:String, required:true},
    password: { type: String },
    location: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

    videos:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Video"
    }],

});

userSchema.pre('save',async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,5 );

    }

})
// 여기서 this는 user controller에서 만들어진 user를 말함. 

const User = mongoose.model("User", userSchema);

export default User;
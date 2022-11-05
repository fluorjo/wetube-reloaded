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

});

userSchema.pre('save',async function(){
    console.log("user pw:", this.password);
    this.password = await bcrypt.hash(this.password,5 );
    console.log("hashed pw:", this.password);

})
// 여기서 this는 user controller에서 만들어진 user를 말함. 

const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
//mongodb://127.0.0.1:27017/db이름
const db = mongoose.connection;
const handleOpen = ()=>console.log("✅connected to db");
const handleError = (error)=>console.log("db error:", error);

db.on("error",handleError);

//on=여러 번 발생 가능. once=한번만.
db.once("open",handleOpen);

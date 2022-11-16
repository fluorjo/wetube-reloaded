//const express =require("express");
//const app = express();
//이거 대신 쓰는 최신 문법.
import express from "express";
import morgan from "morgan";
const PORT=4000;

const app =express();
const logger =morgan("dev");


// const logger = (req,res,next) =>{
//     console.log(`${req.method}${req.url}`);
//     next();
// };

const home = (req,res)=>{
    // return res.end();
    console.log("I will respond");
    return res.send("hello");
};

const login = (req,res)=>{
    return res.send("login");
};

app.use(logger);
app.get("/",home);
app.get("/login",login);

const handleListening=()=>
console.log(`server listening on port http://localhost:${PORT}📞`);

app.listen(PORT,handleListening);
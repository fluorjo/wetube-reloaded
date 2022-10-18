//const express =require("express");
//const app = express();
//이거 대신 쓰는 최신 문법.
import express from "express";

const PORT=4000;

const app =express();

const logger = (req,res,next) =>{
    console.log(`${req.method}${req.url}`);
    next();
};

const handleHome = (req,res)=>{
    // return res.end();
    return res.send("wawawa");
};

app.get("/",logger, handleHome);

const handleListening=()=>console.log(`server listening on port http://localhost:${PORT}📞`);

app.listen(PORT,handleListening);
import express from "express";

import {watch, getEdit,postEdit,getUpload,postUpload,getMemeUpload,deleteVideo} from "../controllers/videoController";
import { protectorMiddleware,videoUpload,memeUpload } from "../middlewares";
const  videoRouter=express.Router() ;



videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);


//[]{} 사이에 띄어쓰기 있으면 안됨. 주의.

videoRouter
.route("/upload")
.all(protectorMiddleware)
.get(getUpload)
.post(videoUpload.fields([
    {name:"video",maxCount:1},
    {name:"thumb",maxCount:1}
]),postUpload);

videoRouter
.route("/:id([0-9a-f]{24})/memeMaker")
.all(protectorMiddleware)
.get(getMemeUpload)
// .post(memeUpload.single([
//     {name:"meme",maxCount:1}
// ]),postMemeUpload);


export default videoRouter;

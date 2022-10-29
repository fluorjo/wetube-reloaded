import express from "express";
import {watch, getEdit,postEdit,getUpload,postUpload} from "../controllers/videoController";
const  videoRouter=express.Router() ;

videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
//[]{} 사이에 띄어쓰기 있으면 안됨. 주의.
videoRouter.route("/upload").get(getUpload).post(postUpload);


/*
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id",watch);
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);

이렇게 upload를 위로 올려서 해결하는 방법도 있음.
*/


export default videoRouter;

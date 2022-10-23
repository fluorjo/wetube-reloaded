import express from "express";
import {see, edit,upload,deleteVideo} from "../controllers/videoController";
const  videoRouter=express.Router() ;

videoRouter.get("/upload",upload);
//순서 주의. upload가 id보다 먼저 와야 함. 
//안 그러면 express가 upload라는 텍스트 자체를 id라고 인식해버림.
videoRouter.get("/:id(\\d+)",see);
videoRouter.get("/:id(\\d+)/edit",edit);
videoRouter.get("/:id(\\d+)/delete",deleteVideo);
export default videoRouter;

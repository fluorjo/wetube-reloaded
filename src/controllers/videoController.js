import Video from "../models/Video";
//const fakeUser = {username:"j",loggedIn:false,};

export const  home = (req,res)=>{
    Video.find({}, (error,videos)=> {
        return res.render("home",{pageTitle:"Home", videos});
    });
};
export const  watch = (req,res)=>{
    const { id } = req.params;
    //const id = req.params.id;
    //params는 video router에서 받아옴

    
    return res.render("watch",{pageTitle: `Watching`});
};
export const getEdit = (req,res)=>{
    const { id } = req.params;

    return res.render("edit",{pageTitle:`Editing`});
};
export const postEdit = (req,res)=>{
    const { id } = req.params;
    const { title } = req.body;
    //const title = req.body.title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res)=>{
    return res.render("upload",{pageTitle:"Upload video"});
};
export const postUpload = (req, res)=>{
    //여기서 비디오를 array에 추가할 예정
    const {title} = req.body;
    
    return res.redirect("/");
};
 
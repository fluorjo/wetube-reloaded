import Video from "../models/Video";
//const fakeUser = {username:"j",loggedIn:false,};

/*
        const  videos = await Video.find({});
        return res.render("home",{pageTitle:"Home", videos});
*/
/*
Video.find({}, (error,videos)=> {
    if(error){
        return res.render("server-error");
    }
    return res.render("home",{pageTitle:"Home", videos});
});
*/


export const  home = async(req,res)=>{
        const  videos = await Video.find({});
        return res.render("home",{pageTitle:"Home", videos});
};
export const  watch = async(req,res)=>{
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        //video===null
        return res.render("404",{pageTitle:"Video not Found"});   
    }
    return res.render("watch",{ pageTitle: video.title, video
    });
};
export const getEdit = async(req,res)=>{
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        //video===null
        return res.render("404",{pageTitle:"Video not Found"});   
    }
    return res.render("edit",{pageTitle:`Edit ${video.title}`,video});
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
export const postUpload = async(req, res)=>{
    //여기서 비디오를 array에 추가할 예정
    const {title, description, hashtags} = req.body;
    try{
        await Video.create({
            title,
            //title:title이라고 써도 됨. 왼쪽은 schema, 오른쪽은 body의 title.
            description,
            hashtags:hashtags.split(",").map((word)=>`#${word}`),

        });
        return res.redirect("/");
    } catch(error){
        return res.render("upload",{pageTitle:"Upload video",errorMessage: error._message,
    });
    }
    //promise:저장될 때까지 기다린다. 
};
 
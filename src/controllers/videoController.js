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


export const postEdit = async(req,res)=>{
    const { id } = req.params;
    const {title, description, hashtags}=req.body;
    const video = await Video.exists({_id:id});
    //여기 'v'ideo는 db에서 검색한 영상 object.
    if(!video){
        return res.render("404",{pageTitle:"Video not Found"});   
    }
    await Video.findByIdAndUpdate(id, {
        //여기 'V'ideo는 우리의 영상 모델.
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });


    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res)=>{
    return res.render("upload",{pageTitle:"Upload video"});
};
export const postUpload = async(req, res)=>{

    const {title, description, hashtags} = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
    });
        return res.redirect("/");
    } catch(error){
        return res.render("upload",{pageTitle:"Upload video",errorMessage: error._message,
    });
    }
    //promise:저장될 때까지 기다린다. 
};
 
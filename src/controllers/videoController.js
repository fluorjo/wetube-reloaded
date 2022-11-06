import Video from "../models/Video";
import User from "../models/User";

export const  home = async(req,res)=>{
        const  videos = await Video.find({}).sort({createdAt:"desc"});
        return res.render("home",{pageTitle:"Home", videos});
};
export const  watch = async(req,res)=>{
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");

    if(!video){
        return res.status(404).render("404",{pageTitle:"Video not Found"});   
    }
    return res.render("watch",{ pageTitle: video.title, video,
    });
};
export const getEdit = async(req,res)=>{
    const { id } = req.params;
    const {user:{_id}} =req.session;

    const video = await Video.findById(id);
    if(!video){
        //video===null
        return res.status(404).render("404",{pageTitle:"Video not Found"});   
    }
    console.log(video.owner, _id);
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("edit",{pageTitle:`Edit ${video.title}`,video});
};


export const postEdit = async(req,res)=>{
    const {user:{_id}} =req.session;

    const { id } = req.params;
    const {title, description, hashtags}=req.body;
    const video = await Video.exists({_id:id});
    //여기 'v'ideo는 db에서 검색한 영상 object.
    if(!video){
        return res.render("404",{pageTitle:"Video not Found"});   
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
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
    const {
        user:{_id},
    } = req.session;
    const {path:fileUrl} = req.file;

    const {title, description, hashtags} = req.body;
    try{
        const newVideo = await Video.create({
            title,
            description,
            fileUrl,
            owner:_id,
            hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
        return res.redirect("/");
    } catch(error){
        return res.status(400).render("upload",{pageTitle:"Upload video",errorMessage: error._message,
    });
    }
    //promise:저장될 때까지 기다린다. 
};
 
export const deleteVideo = async(req,res)=>{
    const {id} = req.params;
    const {user:{_id}} =req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
      }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    //remove도 있는데 쓰지 말고 delete로 할 것. remove를 쓰면 되돌릴 수가 없다(?)
    console.log(id);
    return res.redirect("/");
};
export const search = async(req,res)=>{
    const {keyword} = req.query;
    let videos =[];
    if(keyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"),
                //"i" 대소문자 구분 없애기
            }
        });
    } 
    return res.render("search",{pageTitle:"Search", videos});
};


//const fakeUser = {username:"j",loggedIn:false,};
let videos = [
    {
        title:"First video",
        rating:5,
        comments:2,
        createdAt:"2 minutes ago",
        views:1,
        id:1,
    },
    {
        title:"Second video",
        rating:5,
        comments:2,
        createdAt:"2 minutes ago",
        views:59,
        id:2,
    },
    {
        title:"Third video",
        rating:5,
        comments:2,
        createdAt:"2 minutes ago",
        views:59,
        id:3,
    },
];



export const  trending = (req,res)=>{
    return res.render("home",{pageTitle:"Home",videos});
};
export const  watch = (req,res)=>{
    const { id } = req.params;
    //const id = req.params.id;
    //params는 video router에서 받아옴
    const video = videos[id-1];
    
    return res.render("watch",{pageTitle: `Watching ${video.title}`, video});
};
export const  edit = (req,res)=>res.render("edit");
export const  search = (req,res)=>res.send("search");
export const  upload = (req,res)=>res.send("upload");
export const  deleteVideo = (req,res)=>res.send("deleteVideo");


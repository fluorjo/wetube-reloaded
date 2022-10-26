//const fakeUser = {username:"j",loggedIn:false,};


export const  trending = (req,res)=>{
    const videos = [
        {
            title:"First video",
            rating:5,
            comments:2,
            createdAt:"2 minutes ago",
            views:59,
            id:1,
        },
        {
            title:"Second video",
            rating:5,
            comments:2,
            createdAt:"2 minutes ago",
            views:59,
            id:1,
        },
        {
            title:"Third video",
            rating:5,
            comments:2,
            createdAt:"2 minutes ago",
            views:59,
            id:1,
        },
    ];
    
    
    return res.render("home",{pageTitle:"Home",videos});

};
export const  see = (req,res)=>res.render("watch");
export const  edit = (req,res)=>res.render("edit");
export const  search = (req,res)=>res.send("search");
export const  upload = (req,res)=>res.send("upload");
export const  deleteVideo = (req,res)=>{
    console.log(req.params);
    return res.send("deleteVideo");
}


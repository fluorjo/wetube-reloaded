import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";



const app =express();
const logger =morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd()+"/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    //세션이 만들어지고 수정(초기화)된 적이 없다.

    /*cookie:{
        maxAge:5000,
    },*/
    store:MongoStore.create({mongoUrl:process.env.DB_URL}),
    })
);

app.use(localsMiddleware);
app.use("/uploads",express.static("uploads"));
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app;

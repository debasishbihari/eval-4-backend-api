const mongoose = require("mongoose");
mongoose.set("strictQuery",true)
const express=require("express")
const {connection} = require("./config/db");
require("dotenv").config()
const PORT = process.env.PORT || 8080
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const UserRoutes = require("./routes/user.route")
const PostRoutes = require("./routes/post.route")

const Authentication = require("./middleware/auth");

app.get("/", async (req, res) => {
    res.send("backend is working");
  });
  
  app.use("/users", UserRoutes);
  
  app.use(Authentication);
  app.use("/posts", PostRoutes);

app.listen(PORT,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
    console.log(`server is running on ${PORT} port`)
})

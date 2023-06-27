/**
 * todo: connect my website to the arduino device and show the various readings
 */

const express=require("express");
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(8080,()=>{
    console.log("We are listening to 8080!!!")
})

/**
 * todo: connect my website to the arduino device and show the various readings
 */

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Temperature=require("./models/temperature");
const ejsMate=require('ejs-mate');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs',ejsMate);
app.set('view engine','ejs');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/IOT-project");
    console.log("Connection open!");
};

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/smoke",async (req,res)=>{

})

app.get("/temperature", async (req, res) => {
    
    res.render("temperature",{temps:[]});
});
  
app.post("/temperature",async (req,res)=>{
  //do something
  console.log(req.body.temperature);
  if(req.body.temperature.date){
  const startDate=new Date(req.body.temperature.date);
  const endDate =new Date(req.body.temperature.date);
  endDate.setDate(endDate.getDate()+1);
  
  const temps = await Temperature.find({
    time: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({time:1}).exec();
  
  res.render("temperature",{temps:temps})
}
  res.render("temperature",{temps:[]})
  
})


app.get("*",(req,res)=>{
  res.send("ERROR");
})




app.listen(8080,()=>{
    console.log("We are listening to 8080!!!")
})

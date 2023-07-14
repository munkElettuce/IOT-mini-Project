/**
 * todo: connect my website to the arduino device and show the various readings
 */

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Temperature=require("./models/temperature");
const PulseRate=require('./models/pulse');
const SmokeIntensity=require("./models/smoke");
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
    // console.log("got a request!!!")
    res.render("index");
})


app.get("/pulse/users",async (req,res)=>{
  // console.log("pulse/users");
  const users=await PulseRate.find({});
  res.render("pulse/users",{users:users});
})

app.get("/temperature", async (req, res) => {
    
    res.render("temperature",{temps:[]});
});

app.get("/smoke",async (req,res)=>{

  res.render('smoke',{smokeArr:[]});
})


app.get("/pulse/user/:id",async (req,res)=>{
  const userId=req.params.id;
  console.log(userId);
})

  
app.post("/temperature/find",async (req,res)=>{
  //do something
  if(req.body.temperature.date){
  const startDate=new Date(req.body.temperature.date);
  const endDate =new Date(req.body.temperature.date);
  endDate.setDate(endDate.getDate()+1);
  // console.log(req.body.temperature.date);
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


app.post("/smoke",async (req,res)=>{
  if(req.body.date){
    const startDate=new Date(req.body.date);
    const endDate =new Date(req.body.date);
    endDate.setDate(endDate.getDate()+1);
    // console.log(req.body.temperature.date);
    const temps = await SmokeIntensity.find({
      time: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({time:1}).exec();
    // console.log(temps);
    res.render("smoke",{smokeArr:temps})
  }
    res.render("smoke",{smokeArr:[]})
})


app.get("/get-temp-data", async (req,res)=>{
  let { date } = req.query;
  
  date=new Date(date);
  // console.log(date);

  const startDate=new Date(date);
  const endDate =new Date(date);
  endDate.setDate(endDate.getDate()+1);
  const temps = await Temperature.find({
    time: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({time:1}).exec();
  // console.log(temps);
  res.json(temps);
})

app.get("/get-smoke-data", async (req,res)=>{
  let { date } = req.query;
  
  date=new Date(date);
  // console.log(date);

  const startDate=new Date(date);
  const endDate =new Date(date);
  endDate.setDate(endDate.getDate()+1);
  const temps = await SmokeIntensity.find({
    time: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({time:1}).exec();
  // console.log(temps);
  res.json(temps);
})

app.get("/add-pulse",async (req,res)=>{
  const {name,pulse}=req.body;
  //{req.body.temp has name, pulse}
  const newPulse=new PulseRate({
    name:name,
    pulseRate:pulse,
    time:new Date()
  })
  await newPulse.save();
  // console.log(newPulse);
})

app.post("/temperature",async (req,res)=>{
  const temp=req.body.temp;
  /**
   * temperature={
   * temp:Number,
   * time:Date}
   */
  
  const newTemp=new Temperature({
    temp:temp,
    time:new Date()
  });
  await newTemp.save();
  // console.log(req.body);
})

app.get("*",(req,res)=>{
  res.send("ERROR");
})




app.listen(8080,()=>{
    console.log("We are listening to 8080!!!")
})

/**
 * todo: connect my website to the arduino device and show the various readings
 */

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Temperature=require("./models/temperature");


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/IOT-project");
    console.log("Connection open!");
};

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/temperature", async (req, res) => {
    // console.log(req.body.temperature.date);
    const startDate = new Date('2023-07-07');
    const endDate = new Date("2023-07-08");
    const temps = await Temperature.find({
      time: {
        $gte: startDate,
        $lte: endDate
      }
    });
    // console.log(temps);
    res.render("temperature",{temps:temps});
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
  });
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

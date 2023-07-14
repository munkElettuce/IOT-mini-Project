// const mongoose = require('mongoose');
// const Schema=mongoose.Schema;


// const smokeSchema=Schema({
//     smokeDensity:{
//         type:Number,
//         default:NaN,
//         min:0
//     },
//     time:{
//         type:Date,
//         required:true
//     }
// })

// module.exports=mongoose.Model('SmokeIntensity',smokeSchema);


const mongoose = require("mongoose");

const smokeSchema = new mongoose.Schema({
  smokeDensity: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});

const SmokeIntensity = mongoose.model("SmokeIntensity", smokeSchema);

module.exports = SmokeIntensity;


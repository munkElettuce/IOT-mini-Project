const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const TemperatureSchema=new Schema({
    time : { type : Date, default: Date.now },
    temp: {type: Number, default: null}
})

module.exports=mongoose.model('Temperature',TemperatureSchema);
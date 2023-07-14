const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const pulseSchema=Schema({
    name:{
        type:String,
        default:null,
        required:true
    },
    
    
    pulseRate:{
        type:Number,
        required:true,
        default:null
    },
    time:{
        type:Date,
        required:true
    }
})


module.exports=new mongoose.model('PulseRate',pulseSchema);
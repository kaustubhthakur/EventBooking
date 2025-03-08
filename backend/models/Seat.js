const mongoose = require('mongoose')
const SeatSchema = new mongoose.Schema({
    price:{
        type:Number,
        default:0,
    },
    seatNumber:{
        type:Number,
        default:0,
    },
    isBooked:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true,
},);

module.exports  = mongoose.model("Seat",SeatSchema);

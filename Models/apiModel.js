const { timeStamp } = require("console")
const mongoose = require ("mongoose")
const Schema= mongoose.Schema

const giftdataSchema = new Schema({
    Network : {
        type: String,
        required: true
    },
    DataPlan : {
        type :String,
        required: true
    },
    PhoneNum : {
        type : Number,
        required: true
    },
    Quantity :{
        type : Number,
        required: true
    },
    cost : {
        type : Number, 
    }
},
{timeStamp: true},
)
// change to a Model
const giftdataModel = mongoose.model("giftdataModel", giftdataSchema)

module.exports= giftdataModel

// export it
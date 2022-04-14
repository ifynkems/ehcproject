

// get the packages
Const .env = require("dotenv")
env.config()

const heroku = reqire("heroku")
const express = require("express")
const { request } = require("http")
const mongoose = require("mongoose")
const { env } = require("process")
const giftdataModel = require("./Models/apiModel.js")

// initialize 
const app = express()
app.use(express.json())


// connect tha database
mongoose.connect(
   process.env.MONGO_URL
   ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(function () {
        console.log('database connected succesfully')
    }).catch(function (error) {
        console.log('Unable to conneted to database')
    })
//connect with a database


// routes
app.get('/', function (req, res) {
    res.send('Welcome to EmpowerHer Community')
})

//app.get('/api',function(req,res){
//  res.send ('you have to participate fullyin the Community' )
//})


app.post('/create', async function (req, res) {
    const { Network, DataPlan, PhoneNum, Quantity, cost } = req.body
    try {
        const apiData = await giftdataModel.create({
            Network,
            DataPlan,
            PhoneNum,
            Quantity,
            cost
        });
        res.json({
            data: apiData,
            message: 'data added to DB'
        })
    } catch (error) {
        console.log(error)
    }
    
})

// to show all to do
app.get('/all', async function(req,res){ 
    try {
        const allData = await giftdataModel.find()
        
        res.json({
            data: allData,
            message: 'all data found'
        })
    }    catch (error){
        console.log(error)
    }
    })


    // TO GET A PARTICULAR ITEMS
    app.get('/item/:id', async function(req,res){ 
        const{id} = req.params
        try {
            const item = await giftdataModel.findById(id)
            
            res.json({
                data: item,
                message: 'search found'
            })
        }    catch (error){
            console.log(error)
        }
        })
// to  DELETE an item
app.delete('/item/:id', async function(req,res){ 
    const {id} = req.params
    try {
        const item = await giftdataModel.findByIdAndDelete(id)
        
        res.json({
            data: item,
            message: 'Deleted succesfully'
        })
    }    catch (error){
        console.log(error)
    }
    })

    app.patch('/item/:id', async function(req,res){ 
        const {id} = req.params
        const { Network, DataPlan, PhoneNum, Quantity, cost } = req.body
               try {
            const updateItem = await giftdataModel.findByIdAndUpdate(id, { Network,
                 DataPlan, PhoneNum, Quantity, cost })
            
            res.json({
                data: updateItem,
                message: 'updated succesfully'
            })
        }    catch (error){
            console.log(error)
        }
        })
    
    const PORT = process.env.PORT || 8000
//listen at a point 
app.listen(PORT, function () {
    console.log('Server running sucessfully')
})
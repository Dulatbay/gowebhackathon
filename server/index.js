const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config();

const PORT = process.env.PORT || 5000


const start = async () =>{
    try{
        app.listen(PORT, ()=>{
            console.log(`SERVER STARTED ON PORT ${PORT}`)
        })
    }
    catch (e){
        // TODO: log
        console.log(e);
    }
}

start();


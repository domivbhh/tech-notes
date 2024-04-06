const express=require('express')
const app=express()
const path=require('path')
const {logger}=require('./middleware/logger')
const errorHandler=require('./middleware/errorHandler')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')
require('dotenv').config()
const connectDB=require('./config/dbConnect')
const mongoose=require('mongoose')
const{logEvents}=require('./middleware/logger')


connectDB()


app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/',express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/root'))

app.use('/users',require('./routes/userRoutes'))
app.use("/notes", require("./routes/noteRoutes"));




app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }
    else if(req.accepts('json')){
        res.json({message:'404 not Found'})
    }
    else{
        res.type('txt').send('404 not found')
    }
})

const PORT=process.env.PORT || 3500

app.use(errorHandler)

mongoose.connection.once('open',()=>{
    console.log('Connected to mongoDB')
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
})

mongoose.connection.on('error',err=>{
    console.log(err)
    logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
})




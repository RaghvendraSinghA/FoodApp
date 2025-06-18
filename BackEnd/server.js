import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import {userRouter} from './routes/userRoute.js'
import 'dotenv/config'

//app config
const app=express()
const port=process.env.PORT || 4000

//middleware
app.use(express.json())
//express.json() parses the body of request object who is in readable form bcoz front end send in stringify method.

//we also send data using res.json() inside body of response object which is readable stream bcoz front-end hope for json object.
app.use(cors());

//db connection
connectDB();


//api endpoint
app.use("/images",express.static('uploads'))
app.use('/api/user',userRouter)
app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
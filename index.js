 const express = require('express')
 const app = express()
 const port = 3000
 const mongoose = require('mongoose')
 const dotenv = require('dotenv')
 const userRoute = require("./routes/user")
 const authRoute = require("./routes/auth")
 dotenv.config();

 mongoose.connect(process.env.MONGO_URL).then(() => {
     console.log('success__')
 }).catch((e) => {
     console.log(e)
 });
 //  app.get("/clint", (req, res) => res.send("test is successful"));
 app.use(express.json());
 app.use("/main", userRoute);
 app.use("/auth", authRoute);
 app.get('/', (req, res) => res.send('Hello World!'))
 app.listen(port, () => {
     console.log(`server is running`)
 })
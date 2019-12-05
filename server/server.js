const express = require("express");
const app = express();
const cors = require("cors");
const search=require('./routes/searchRoute')
const reminder=require('./routes/reminderRoute')
const categories=require('./routes/categoriesRoute')
const users=require('./routes/userRoute')
// middleware
app.use(cors());
app.use(express.json());

// app.use('/location',route)
app.use('/',search)
app.use('/location',categories)
app.use('/reminder',reminder)
app.use('/login',users)
// setting server to start
app.listen(8080, () => {
    console.log("server is ready");
})
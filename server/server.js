const express = require("express");
const app = express();
const cors = require("cors");
const route=require('./routes/route')
const reminder=require('./routes/reminder')

// middleware
app.use(cors());
app.use(express.json());

app.use('/location',route)
app.use('/reminder',reminder)
// setting server to start
app.listen(8080, () => {
    console.log("server is ready");
})
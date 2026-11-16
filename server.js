//we will start server here in this file:

// now we can use process.env.(variable name defined in .envfile)
require("dotenv").config();

const app=require("./src/app")

//for testing
app.get("/",(req,res)=>{
    res.send("roleFit backend server is live...")
})

const PORT=3000; // or use 5000
app.listen(PORT,()=>{
    console.log(`Server is running on: http://localhost:${PORT}`)
})


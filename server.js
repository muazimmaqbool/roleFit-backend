//we will start server here in this file:

// now we can use process.env.(variable name defined in .envfile)
require("dotenv").config();

const app=require("./src/app")
const connectToDB=require("./config/db")

connectToDB()


const PORT=3000; // or use 5000

//for testing
app.get("/",(req,res)=>{
    res.send("roleFit backend server is live...")
})


app.listen(PORT,()=>{
    console.log(`Server is running on: http://localhost:${PORT}`)
})


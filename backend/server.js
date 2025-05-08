const express=require('express');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/authRoutes');


app.use("/api/auth", authRoutes);

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
})
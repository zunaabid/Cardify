const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use("/api/auth", authRoutes);

const projectRoutes= require('./routes/projectRoutes');
app.use("/api/proj",projectRoutes);

const templaeRoutes=require('./routes/templateRoutes');
app.use("/api/temp",templaeRoutes);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const {router:adminRoutes}=require('./routes/adminRoutes');
const app = express();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))

app.use(express.json()); 
app.use('/uploads', express.static('uploads'));


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
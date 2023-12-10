//import bodyParser from 'body-parser';
// const UserModel = require('./models/userModel'); 
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const Purchase = require('./models/purchaseModel');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
require('dotenv').config();

const app = express();
app.use(cors({
  //origin: ['https://finance-tracker-frontend-one.vercel.app', 'https://finance-tracker-api-elisha-edmes-projects.vercel.app', 'http://localhost:3000'],
  origin: ['https://finance-tracker-frontend-one.vercel.app'," https://finance-tracker-frontend-one.vercel.app/login", "https://finance-tracker-frontend-one.vercel.app/register", 'http://localhost:3000'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());
app.use('/api/user/', userRoutes);
app.use('/api/purchases/', purchaseRoutes);

app.get('/', (req, res) => {
  res.json('Hello');
});
const connect = async () => mongoose.connect(process.env.MONGO_URI);
connect().then(() => {
  console.log('MongoDB connected properly!')
  app.listen(process.env.PORT)
}).catch(console.log);
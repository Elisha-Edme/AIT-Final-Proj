//import bodyParser from 'body-parser';
// const UserModel = require('./models/userModel'); 
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const purchase = require('./models/purchaseModel');
const user = require('./models/userModel');
const workoutRoutes = require('./routes/workoutRoutes');
require('dotenv').config();

const app = express();
app.use(express.json())
//app.use('/api/', workoutRoutes);
app.get('/', async (req, res) => {
  await purchase.deleteMany({});
  // await purchase.create({"Retailer": "BJs",
  // "BoughtTime": new Date("2023-09-12"),// timestamp
  // "Cost": 62.00,// cost of purchase
  // "PaymentMethod": "BoFA",
  // "Category": "Groceries"})
  res.send(await purchase.find({}));
});
app.get('/login', (req, res) => {
  
});
app.post('/login', (req, res) => {
  const {name, password} = req.body;
  user.findOne({name, password})
  .then(res.redirect('/'))
  .catch(res.send('ERROR'));
});
const connect = async () => mongoose.connect(process.env.MONGO_URI);
connect().then(() => {
  console.log('MongoDB connected properly!')
  app.listen(process.env.PORT || 3000)
}).catch(console.log);


  //  app.use(bodyParser.urlencoded({ extended: false }));
  //  app.get('/', async (req, res) => {
  //   try {
  //     const users = await UserModel.find({});
  //     console.log('Documents found:', users);
  //     await UserModel.create({'name':'test2', 'password':'pw2'});
  //     console.log(`New Docs: ${await UserModel.find({})}`);
  //   } catch (error) {
  //     console.error('Error fetching documents:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });   


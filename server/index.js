//import bodyParser from 'body-parser';
// const UserModel = require('./models/userModel'); 
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const Purchase = require('./models/purchaseModel');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin:['https://finance-tracker-frontend-one.vercel.app', 'localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true
  }
));
app.use('/api/user/', userRoutes);

app.get('/', (req, res) => {
  res.json('Hello');
});
const connect = async () => mongoose.connect(process.env.MONGO_URI);
connect().then(() => {
  console.log('MongoDB connected properly!')
  app.listen(process.env.PORT)
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
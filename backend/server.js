const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const VehicleAPI = require('./src/api/vehicle.api')
const CategoryAPI = require('./src/api/category.api')

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

mongoose.connection.once('open', () => {
  console.log('Database Synced');
});

app.route('/').get((req, res) => {
  res.send('SLIIT AF FINAL MOCK');
});

app.use('/vehicle', VehicleAPI());
app.use('/category',CategoryAPI());

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});

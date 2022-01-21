const bodyParser = require('body-parser');
const express = require('express');
const env = require('dotenv');
const console = require('console');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

env.config();
const App = express();

// route
const authRoutes = require('./routes/admin/auth');
const userRoutes = require('./routes/auth');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const initialDataRoute = require('./routes/admin/initialData');

// middleware
App.use(cors());
App.use(bodyParser.json());
App.use('/categoryimg', express.static(path.join(__dirname, 'uploads')));
App.use('/public', express.static(path.join(__dirname, 'uploads')));
App.use('/api', authRoutes);
App.use('/api', userRoutes);
App.use('/api', categoryRoute);
App.use('/api', productRoute);
App.use('/api', cartRoute);
App.use('/api', initialDataRoute);

App.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello world',
  });
});
App.post('/data', (req, res) => {
  res.status(200).json({ message: req.body.message });
});

// conect to the mongo db server
mongoose.connect('mongodb://localhost:27017/e-comerce-with-react', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connection sucessful to the mongo db server');
});

// server listen
const port = process.env.PORT;
App.listen(port, () => {
  console.log(`server runing in port number ${port}`);
});

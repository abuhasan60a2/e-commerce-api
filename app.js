const express= require('express');
const morgan = require('morgan');
const userRouter = require('./routes/UserRoute');
const productRouter = require('./routes/ProductRoute');
const CategoryRouter = require('./routes/CategoryRoute');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories',CategoryRouter);
app.get('/', (req, res) => {
    res.status(200).send('Hello from the server side!');
});
module.exports = app;
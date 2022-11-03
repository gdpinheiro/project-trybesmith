import express from 'express';
import ProductsController from './controllers/products.controller';
import UsersController from './controllers/users.controller';
import OrdersController from './controllers/orders.controller';

import productValidation from './middlewares/productValidation.middleware';
import userValidation from './middlewares/userValidation.middleware';

const app = express();

app.use(express.json());

const productsController = new ProductsController();
const usersController = new UsersController();
const ordersController = new OrdersController();

app.get('/products', productsController.getAll);

app.post('/products', productValidation, productsController.create);

app.post('/users', userValidation, usersController.create);

app.get('/orders', ordersController.getAll);

export default app;

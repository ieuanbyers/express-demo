import { Application } from 'express';
import { Request, Response } from 'express';
import { Order } from '../model/order';
import { OrderProduct } from '../model/orderProduct';
import { Customer } from '../model/customer';

const orderService = require('../service/orderService');
const customerService = require('../service/customerService');

module.exports = function (app: Application) {
  app.get('/orders', async (req: Request, res: Response) => {
    let data: Order[];

    try {
      data = await orderService.getOrders();
    } catch (e) {
      console.error(e);
    }

    res.render('list-orders', { orders: data });
  });

  app.get(`/orders/:id`, async (req: Request, res: Response) => {
    let data: OrderProduct;

    try {
      data = await orderService.getOrderById(req.params.id);
    } catch (e) {
      console.error(e);
    }

    res.render('view-order', { order: data });
  });

  app.get('/add-order', async (req: Request, res: Response) => {
    let data: Customer = await customerService.getCustomers();
    res.render('add-order', { customers: data });
  });

  app.post('/add-order', async (req: Request, res: Response) => {
    let data: Order = req.body;
    let id: Number;

    try {
      id = await orderService.createOrder(data);

      res.redirect('orders/' + id);
    } catch (e) {
      console.error(e);

      res.locals.errormessage = e.message;

      res.render('add-order', req.body);
    }
  });
};

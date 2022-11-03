import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    const result = orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      products: [order.products],
    }));
    res.status(200).json(result);
  };
}

export default OrderController;

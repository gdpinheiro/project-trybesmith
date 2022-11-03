import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT od.id, od.userId, pd.id AS products
      FROM Trybesmith.Orders AS od 
      JOIN Trybesmith.Products AS pd
      ON pd.orderId = od.id `,
    );
    const [rows] = result;
    return rows as Order[];
  }
}

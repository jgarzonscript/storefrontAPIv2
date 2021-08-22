import { client } from '../database';

export type Order = {
    id: string;
    user_id: string;
    status: string;
};

export type OrderProduct = {
    order_id: string;
    product_id: string;
    quantity: number;
};

export class OrderStore {
    /**
     * @description Current Order by user
     * @param userid
     * @returns order if exists
     */
    async orderByUser(userid: string): Promise<Order> {
        try {
            const sql =
                    "select * from orders where user_id = $1 and status = 'active' order by id desc limit 1;",
                conn = await client.connect(),
                result = await conn.query(sql, [userid]);
            conn.release();

            if (result.rows.length) {
                const order: Order = result.rows[0];
                return order;
            }

            throw new Error(`orders does not exist for user_id of ${userid}`);
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve order > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async create(userId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *',
                conn = await client.connect(),
                result = await conn.query(sql, ['active', userId]);

            const newOrder = result.rows[0];
            conn.release();
            return newOrder;
        } catch (error) {
            const e = new Error(`unable to create order > ${error.message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async addProduct(orderId: string, productId: string, quantity: string): Promise<OrderProduct> {
        try {
            const sql =
                    'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                conn = await client.connect(),
                result = await conn.query(sql, [orderId, productId, quantity]);
            conn.release();
            const orderProducts: OrderProduct = result.rows[0];
            return orderProducts;
        } catch (error) {
            const e = new Error(`unable to add product to order > ${error.message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

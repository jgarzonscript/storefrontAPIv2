import { client } from '../database';

export type Order = {
    id: number;
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

            const order: Order = result.rows[0];
            return order;
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve order -- ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async create(userId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *',
                conn = await client.connect(),
                result = await conn.query(sql, ['active', userId]);

            const newOrder: Order = result.rows[0];
            conn.release();
            return newOrder;
        } catch (error) {
            const e = new Error(`unable to create order -- ${(error as Error).message}`);
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
            const e = new Error(`unable to add product to order > ${(error as Error).message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async productsByOrder(order_id: string): Promise<OrderProduct[]> {
        try {
            const sql = 'select * from order_products where order_id = $1;',
                conn = await client.connect(),
                result = await conn.query(sql, [order_id]);
            conn.release();

            const productsByOrder: OrderProduct[] = result.rows;
            return productsByOrder;
        } catch (error) {
            const e = new Error();
            e.message = `unable to process query 'products by order' -- ${
                (error as Error).message
            }`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async updateCartItem(order_id: string, product_id: string, qty: string): Promise<number> {
        try {
            const sql =
                    'update order_products set quantity = $3 where product_id = $2 and order_id = $1 returning *',
                conn = await client.connect(),
                queryResult = await conn.query(sql, [order_id, product_id, qty]);
            conn.release();

            const recordsUpdated = queryResult.rows.length;
            return recordsUpdated;
        } catch (error) {
            const e = new Error();
            e.message = `error processing updateCartItem(); ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async removeCartItem(order_id: string, product_id: string): Promise<number> {
        try {
            const sql =
                    'delete from order_products where order_id = $1 and product_id = $2 RETURNING *;',
                conn = await client.connect(),
                queryResult = await conn.query(sql, [order_id, product_id]);
            conn.release();

            const records: number = queryResult.rows.length;
            return records;
        } catch (error) {
            const e = new Error();
            e.message = `error processing removeCartItem(); ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

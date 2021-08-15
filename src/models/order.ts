import { client } from '../database';

export type Order = {
    id: string;
    user_id: string;
    status: string;
};

export class OrderStore {
    /**
     * @description Current Order by user. status options are: 1. open ; 2. closed ;
     * @param userid
     * @returns order if exists
     */
    async orderByUser(userid: string): Promise<Order> {
        try {
            const sql = "select * from orders where user_id = $1 and status = 'active' limit 1;",
                conn = await client.connect(),
                result = await conn.query(sql, [userid]);
            conn.release();
            const order: Order = result.rows[0];
            return order;
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
}

import { client } from '../database';

export type Product = {
    id?: string;
    name: string;
    price: number;
    categoryId: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'select * from products;',
                conn = await client.connect(),
                result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve products > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql =
                    'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *',
                conn = await client.connect(),
                result = await conn.query(sql, [product.name, product.price, product.categoryId]);
            conn.release();
            const newProduct = result.rows[0];
            return newProduct;
        } catch (error) {
            const e = new Error(`unable to create product > ${error.message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'select * from products where id = $1;',
                conn = await client.connect(),
                result = await conn.query(sql, [id]);
            conn.release();
            const product: Product = result.rows[0];
            return product;
        } catch (error) {
            const e = new Error(`unable to retrieve product [with id > ${id}] > ${error.message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

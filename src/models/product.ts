import { client } from '../database';

export type Product = {
    id?: string;
    name: string;
    price: number;
    categoryId: number;
    seen?: number;
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

            /* the following logic is for popular products */
            if (product) {
                let seen = 1;
                if (Number.isInteger(product.seen)) {
                    seen = parseInt(String(product.seen));
                    seen++;
                }

                const sql = 'update products set seen = $1 where id = $2;',
                    conn = await client.connect(),
                    result = await conn.query(sql, [seen, product.id]);
                conn.release();
                product.seen = seen;
            }

            return product;
        } catch (error) {
            const e = new Error(`unable to retrieve product [with id > ${id}] > ${error.message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async popularProducts(): Promise<Product[]> {
        try {
            const sql = 'select * from products where seen >= 1 order by seen desc limit 5;',
                conn = await client.connect(),
                result = await conn.query(sql);
            conn.release();
            const products: Product[] = result.rows;
            return products;
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve "popular" products > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async productsByCategory(categoryId: string): Promise<Product[]> {
        try {
            const sql = 'select * from products where category_id = $1;',
                conn = await client.connect(),
                result = await conn.query(sql, [categoryId]);
            conn.release();
            const products: Product[] = result.rows;
            return products;
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve products by category > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

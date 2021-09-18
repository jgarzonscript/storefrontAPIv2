import { client } from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    categoryId?: number;
    seen?: number;
    url?: string;
    description?: string;
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
            e.message = `unable to retrieve products > ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql =
                    'INSERT INTO products (name, price, category_id, url, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                conn = await client.connect(),
                result = await conn.query(sql, [
                    product.name,
                    product.price,
                    product.categoryId,
                    product.url,
                    product.description
                ]);
            conn.release();
            const newProduct = result.rows[0];
            return newProduct;
        } catch (error) {
            const e = new Error(`unable to create product > ${(error as Error).message}`);
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async show(id: number): Promise<Product> {
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
            const e = new Error(
                `unable to retrieve product [with id ${id}] > ${(error as Error).message}`
            );
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async update(product: Product): Promise<Product> {
        try {
            const sql =
                    ' UPDATE products SET name = $1, price = $2, category_id = $3, url = $4, description = $5 WHERE id = $6 RETURNING *;',
                conn = await client.connect(),
                response = await conn.query(sql, [
                    product.name,
                    product.price,
                    product.categoryId,
                    product.url,
                    product.description,
                    product.id
                ]);
            conn.release();
            const updatedProduct: Product = response.rows[0];
            return updatedProduct;
        } catch (error) {
            const e = new Error();
            e.message = `unable to update product ${product.id} > ${(error as Error).message}`;
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
            e.message = `unable to retrieve "popular" products > ${(error as Error).message}`;
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
            e.message = `unable to retrieve products by category > ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

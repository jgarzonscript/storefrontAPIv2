import { client } from '../database';

export type Category = {
    id?: number;
    name: string;
    description: string;
};

export class CategoryStore {
    async index(): Promise<Category[]> {
        try {
            const sql = 'select * from category;',
                conn = await client.connect(),
                result = await conn.query(sql);
            conn.release();
            const categories: Category[] = result.rows;
            return categories;
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve categories > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async create(category: Category): Promise<Category> {
        try {
            const sql = 'INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *;',
                conn = await client.connect(),
                result = await conn.query(sql, [category.name, category.description]);
            conn.release();
            const newCategory: Category = result.rows[0];
            return newCategory;
        } catch (error) {
            const e = new Error();
            e.message = `unable to create category > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

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
            e.message = `unable to retrieve categories > ${(error as Error).message}`;
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
            e.message = `unable to create category > ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async update(category: Category): Promise<Category> {
        try {
            const sql =
                    'UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *;',
                conn = await client.connect(),
                result = await conn.query(sql, [category.name, category.description, category.id]);
            conn.release();
            const updatedCategory: Category = result.rows[0];
            return updatedCategory;
        } catch (error) {
            const e = new Error();
            e.message = `unable to update category ${category.id} > ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async show(id: number): Promise<Category> {
        try {
            const sql = 'select * from category where id = $1;',
                conn = await client.connect(),
                response = await conn.query(sql, [id]);
            conn.release();
            const category = response.rows[0];
            return category;
        } catch (error) {
            const e = new Error();
            e.message = `unable to retrieve category with id ${id} > ${(error as Error).message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

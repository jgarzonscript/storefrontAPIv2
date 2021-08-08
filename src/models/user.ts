import { client } from '../database';
import bcrypt from 'bcrypt';
import { config } from '../../config';

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'select * from users;',
                conn = await client.connect(),
                result = await conn.query(sql);
            conn.release();
            const users: User[] = result.rows;
            return users;
        } catch (error) {
            const e = new Error();
            e.message = `unable to get users > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    /**
     * @description creates a user record in the 'users table'
     * @param user object
     * @returns created user
     */
    async create(user: User): Promise<User> {
        try {
            const sql =
                    'INSERT INTO users (firstname,lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
                conn = await client.connect();

            const hash = bcrypt.hashSync(
                user.password + config.pepper,
                parseInt(config.saltRounds)
            );

            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.username,
                hash
            ]);

            conn.release();

            const newUser: User = result.rows[0];
            return newUser;
        } catch (error) {
            const e = new Error();
            e.message = `unable to create user > ${user.firstname + ' ' + user.lastname} > ${
                error.message
            }`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'select * from users where id = $1;',
                conn = await client.connect(),
                result = await conn.query(sql, [id]);
            conn.release();
            const user: User = result.rows[0];
            return user;
        } catch (error) {
            const e = new Error();
            e.message = `unable to get user > ${error.message}`;
            e.stack = (error as Error).stack;
            throw e;
        }
    }
}

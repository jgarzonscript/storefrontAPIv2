import { Pool, Client } from 'pg';
import { config } from '../config';

export const client = new Pool({
    user: config.user,
    host: config.host,
    database: config.database
});

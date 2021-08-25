import express, { Request, RequestHandler, response, Response } from 'express';
import bodyParser from 'body-parser';

import { port } from '../config';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';
import categoryRoutes from './handlers/category';

import { config } from '../config';

import cors from 'cors';

const app: express.Application = express();
const address: string = `127.0.0.1:${port}`;

app.use(cors({ origin: '*' }));
app.use(express.json() as RequestHandler);

app.get('/', function (req: Request, res: Response) {
    res.send('hello world');
});

app.get('/test', (req: Request, res: Response) => {
    try {
        const environment = config.env;
        const database = config.database;
        res.json({ environment, database });
    } catch (error) {
        res.json(error);
    }
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
categoryRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;

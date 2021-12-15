import express, { Request, RequestHandler, response, Response } from 'express';
import bodyParser from 'body-parser';

import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';
import categoryRoutes from './handlers/category';

import { config, port } from '../config';

import cors from 'cors';

const app: express.Application = express();
const address: string = `127.0.0.1:${port}`;

app.use(cors({ origin: '*' }));
app.use(express.json() as RequestHandler);

app.get('/', function (req: Request, res: Response) {
    res.send("you've reached the end of the internet!\n");
});

app.get('/conninfo', (req: Request, res: Response) => {
    try {
        const environment = config.env;
        const database = config.database;
        const connectionString = config.connectionString;
        res.json({ connectionString, environment });
    } catch (error) {
        res.json(error);
    }
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
categoryRoutes(app);

app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});

export default app;

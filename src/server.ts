import express, { Request, RequestHandler, Response } from 'express';
import bodyParser from 'body-parser';

import { port } from '../config';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';

import { config } from '../config';

const app: express.Application = express();
const address: string = `127.0.0.1:${port}`;

app.use(express.json() as RequestHandler);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

// app.get('/test/enc', (req: Request, res: Response) => {
//     const obj = {
//         pepper: config.pepper,
//         rounds: config.saltRounds,
//         secret: config.tokenSecret
//     };
//     res.json(obj);
// });

productRoutes(app);
userRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

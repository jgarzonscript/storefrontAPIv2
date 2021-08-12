import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../util/middleware';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const orderByUser = async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    try {
        const order = await store.orderByUser(userId);
        res.json(order);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const orderRoutes = (app: express.Application) => {
    app.get('/orderbyuser/:user_id', verifyAuthToken, orderByUser);
};

export default orderRoutes;

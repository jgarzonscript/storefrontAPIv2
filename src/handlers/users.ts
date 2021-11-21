import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../util/middleware';
import { apiResponse } from '../util/responses';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };

    try {
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, config.tokenSecret);
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json((error as Error).message);
    }
};

const show = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const user = await store.show(id);
        res.json(user);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

const authenticate = async (req: Request, res: Response) => {
    const username = req.body.username,
        password = req.body.password;

    const response: apiResponse = {
        success: false
    };

    try {
        const user = await store.authenticate(username, password);

        if (!user) {
            response.message = 'unable to authenticate with provided username/password';
            res.status(401);
        }

        if (user) {
            const token = jwt.sign({ user: user }, config.tokenSecret);
            response.success = true;
            response.data = token;
        }

        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(400).json(response);
    }
};

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.post('/users', create);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users/authenticate', authenticate);
};

export default userRoutes;

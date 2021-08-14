import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
    try {
        const categories = await store.index();
        res.json(categories);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const create = async (req: Request, res: Response) => {
    const category: Category = {
        name: req.body.name,
        description: req.body.description
    };

    try {
        const newCategory = await store.create(category);
        res.json(newCategory);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const categoryRoutes = (app: express.Application) => {
    app.get('/category', index);
    app.post('/category', create);
};

export default categoryRoutes;

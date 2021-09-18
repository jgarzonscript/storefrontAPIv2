import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
    try {
        const categories = await store.index();
        res.json(categories);
    } catch (error) {
        res.status(400).json((error as Error).message);
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
        res.status(400).json((error as Error).message);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        // validate parameter id
        if (isNaN(req.params.id as any)) {
            throw new Error(`invalid request -- id parameter '${req.params.id}' is invalid`);
        }

        const category: Category = {
            name: req.body.name,
            description: req.body.description,
            id: parseInt(req.params.id)
        };

        const updatedCategory = await store.update(category);

        if (!updatedCategory) {
            throw new Error('invalid response -- no update was performed. check your parameters.');
        }

        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        // validate parameter id
        if (isNaN(req.params.id as any)) {
            throw new Error(`invalid request -- id parameter '${req.params.id}' is invalid`);
        }

        const id = parseInt(req.params.id);

        const category = await store.show(id);

        if (!category) {
            throw new Error(
                `invalid response -- no category exist with id ${id}. check your parameters.`
            );
        }

        res.json(category);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

const categoryRoutes = (app: express.Application) => {
    app.get('/category', index);
    app.post('/category', create);
    app.patch('/category/:id', update);
    app.get('/category/:id', show);
};

export default categoryRoutes;

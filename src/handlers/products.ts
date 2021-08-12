import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../util/middleware';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId
    };

    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const show = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const product = await store.show(id);

        if (product) {
            res.json(product);
            return;
        }

        res.json(`product was not found with id > ${id}`);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const popularProducts = async (_req: Request, res: Response) => {
    try {
        const products = await store.popularProducts();
        res.json(products);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const productsByCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await store.productsByCategory(categoryId);
        res.json(products);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', verifyAuthToken, create);
    app.get('/products/:id', show);
    app.get('/popularproducts', popularProducts);
    app.get('/productsbycategory/:categoryId', productsByCategory);
};

export default productRoutes;

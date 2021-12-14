import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../util/middleware';
import { apiResponse } from '../util/responses';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const response: apiResponse = {
        success: false
    };

    try {
        const allProducts = await store.index();
        response.success = true;
        response.data = allProducts;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(400).json(response);
    }
};

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.category_id,
        url: req.body.url,
        description: req.body.description
    };

    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

// const show = async (req: Request, res: Response) => {
//     try {
//         // validate parameter id
//         if (isNaN(req.params.id as any)) {
//             throw new Error(`invalid request -- id parameter '${req.params.id}' is invalid`);
//         }

//         const id = parseInt(req.params.id);

//         const product = await store.show(id);

//         if (product) {
//             res.json(product);
//             return;
//         }

//         res.json(`invalid response -- no product exist with id ${id}. check your parameters.`);
//     } catch (error) {
//         res.status(400).json((error as Error).message);
//     }
// };

const update = async (req: Request, res: Response) => {
    try {
        // validate parameter id
        if (isNaN(req.params.id as any)) {
            throw new Error(`invalid request -- id parameter '${req.params.id}' is invalid`);
        }

        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            categoryId: req.body.category_id,
            url: req.body.url,
            description: req.body.description,
            id: parseInt(req.params.id)
        };

        const updatedProduct = await store.update(product);

        if (!updatedProduct) {
            throw new Error('invalid response -- no update was performed. check your parameters.');
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

const popularProducts = async (_req: Request, res: Response) => {
    try {
        const products = await store.popularProducts();
        res.json(products);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

const productsByCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await store.productsByCategory(categoryId);
        res.json(products);
    } catch (error) {
        res.status(400).json((error as Error).message);
    }
};

const indexId = async (req: Request, res: Response) => {
    const product_id = req.params.id;

    const response: apiResponse = {
        success: false
    };

    try {
        const sqlresponse = await store.indexId(product_id);
        response.success = true;
        response.data = sqlresponse;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.message = (<Error>error).message;
        response.stackTrace = (<Error>error).stack;
        res.status(500).json(response);
    }
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', verifyAuthToken, create);
    // app.get('/products/:id', show); // decommissioned
    app.patch('/products/:id', update);
    app.get('/popularproducts', popularProducts);
    app.get('/productsbycategory/:categoryId', productsByCategory); // TODO: - rename to /products/category
    app.get('/products/:id', indexId);
};

export default productRoutes;

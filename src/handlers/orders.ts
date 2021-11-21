import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../util/middleware';
import { Order, OrderStore } from '../models/order';
import { apiResponse, createResponse } from '../util/responses';

const store = new OrderStore();

/**
 *
 * @param user_id query param
 */
const orderByUser = async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    const response: apiResponse = {
        success: false
    };

    try {
        const order = await store.orderByUser(userId);

        if (!order) {
            response.message = 'no active orders available for this user';
            res.status(400);
            res.json(response);
            return;
        }

        response.success = true;
        response.data = order;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(500).json(response);
    }
};

/**
 *
 * @param user_id query param
 */
const create = async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    const response: apiResponse = {
        success: false
    };

    try {
        const newOrder = await store.create(userId);

        if (!newOrder) {
            response.message = 'unable to create order';
            res.status(400);
            res.json(response);
            return;
        }

        response.success = true;
        response.data = newOrder;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(500).json(response);
    }
};

/**
 *
 * @param order_id query param
 * @param product_id body param
 * @param quantity body param
 */
const addProduct = async (req: Request, res: Response) => {
    const order_id = req.params.id,
        product_id = String(req.body.product_id),
        quantity = String(req.body.quantity);

    const response: apiResponse = {
        success: false
    };

    try {
        const order = await store.addProduct(order_id, product_id, quantity);

        if (!order) {
            response.message = 'unable to add product to order';
            res.status(400);
            res.json(response);
            return;
        }

        response.success = true;
        response.data = order;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(400).json(response);
    }
};

/**
 * To-Do : rename this function as cart-items
 * @param order_id query string parameter
 * @returns all cart items from active order
 */
const productsByOrder = async (req: Request, res: Response) => {
    const order_id = req.params.order_id;

    const response: apiResponse = {
        success: false
    };

    try {
        const productsByOrder = await store.productsByOrder(order_id);

        if (!productsByOrder) {
            response.message =
                'something went wrong as nothing was recieved -- query products by order';
            res.status(404);
            res.json(response);
            return;
        }

        response.success = true;
        response.data = productsByOrder;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(400).json(response);
    }
};

/**
 * To update the quantity of the cart item
 *
 * @param order_id query string parameter
 */
const updateCartItem = async (req: Request, res: Response) => {
    const order_id = req.params.order_id,
        product_id = String(req.body.productId),
        qty = String(req.body.qty);

    const response: apiResponse = {
        success: false
    };

    try {
        const updateResult = await store.updateCartItem(order_id, product_id, qty);

        if (!updateResult) {
            response.message = `something went wrong as nothing was recieved; nothing was updated!; updateCartItem()`;
            res.status(404);
            res.json(response);
            return;
        }

        response.success = true;
        response.data = updateResult;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(400).json(response);
    }
};

const removeCartItem = async (req: Request, res: Response) => {
    const order_id = req.params.id,
        product_id = req.params.pid;

    const response = createResponse();

    try {
        const result = await store.removeCartItem(order_id, product_id);

        if (!result) {
            response.message =
                'something went wrong as nothing was removed. </orders/:id/products>';
            res.status(400).json(response);
            return;
        }

        response.success = true;
        response.data = result;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.error = error as Error;
        response.message = (error as Error).message;
        res.status(500).json(response);
    }
};

const orderRoutes = (app: express.Application) => {
    app.get('/orderbyuser/:user_id', verifyAuthToken, orderByUser); //TO-DO; change route to proper route /orders/:user_id
    app.post('/orders/:user_id', verifyAuthToken, create);
    app.post('/orders/:id/products', addProduct);
    app.get('/orders/:order_id/products', productsByOrder); // aka cart items // to-do: rename to cart-items
    app.patch('/orders/:order_id/products', verifyAuthToken, updateCartItem);
    app.delete('/orders/:id/products/:pid', verifyAuthToken, removeCartItem);
};

export default orderRoutes;

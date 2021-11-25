import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../util/middleware';
import { Order, OrderStore } from '../models/order';
import { apiResponse, createResponse } from '../util/responses';

const store = new OrderStore();

/**
 *
 * @param user_id query param
 */
const index = async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    const response: apiResponse = {
        success: false
    };

    try {
        const order = await store.index(userId);

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
        const order = await store.addCartItem(order_id, product_id, quantity);

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
const indexCartItems = async (req: Request, res: Response) => {
    const order_id = req.params.order_id;

    const response: apiResponse = {
        success: false
    };

    try {
        const cartItems = await store.indexCartItems(order_id);

        // if (!cartItems.length) {
        //     response.message = 'cart items is empty';
        //     res.status(404);
        //     res.json(response);
        //     return;
        // }

        response.success = true;
        response.data = cartItems;
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

    const response: apiResponse = {
        success: false
    };

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

const closeOrder = async (req: Request, res: Response) => {
    const order_id = req.params.id;

    const response: apiResponse = {
        success: false
    };

    try {
        const sqlresponse = await store.closeOrder(order_id);
        response.success = true;
        response.data = sqlresponse;
        response.message = `${sqlresponse} record(s) updated`;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.message = (<Error>error).message;
        res.status(500).json(response);
    }
};

const createShipping = async (req: Request, res: Response) => {
    const order_id = req.params.id,
        fullName = <string>req.body.fullName,
        address = <string>req.body.address;

    const response: apiResponse = {
        success: false
    };

    try {
        const sqlresponse = await store.createShipping(order_id, fullName, address);
        response.success = true;
        response.data = sqlresponse;
        response.message = `${sqlresponse} record(s) updated`;
        res.json(response);
    } catch (error) {
        response.success = false;
        response.message = (<Error>error).message;
        res.status(500).json(response);
    }
};

const orderRoutes = (app: express.Application) => {
    app.get('/orders/:user_id', verifyAuthToken, index);
    app.post('/orders/:user_id', verifyAuthToken, create);
    app.post('/orders/:id/products', addProduct);
    app.get('/orders/:order_id/products', indexCartItems);
    app.patch('/orders/:order_id/products', verifyAuthToken, updateCartItem);
    app.delete('/orders/:id/products/:pid', verifyAuthToken, removeCartItem);
    app.delete('/orders/:id/', verifyAuthToken, closeOrder);
    app.post('/orders/:id/shipping', verifyAuthToken, createShipping);
};

export default orderRoutes;

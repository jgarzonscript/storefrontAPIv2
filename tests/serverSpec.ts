import supertest from 'supertest';
import app from '../src/server';
import express from 'express';
import { config } from '../config';
import _log from './util/util';

const request = supertest(app);

import { User } from '../src/models/user';
import { Category } from '../src/models/category';
import { Product } from '../src/models/product';
import { Order, OrderProduct } from '../src/models/order';

describe('server endpoints', () => {
    it('test main route: "/" [GET] ', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        const headers = response.headers;
        expect(headers['content-type']).toMatch(/text\/html/);
        expect(response.text).toBe('hello world');
    });

    /*
        signed token to be used in subsequent test routes
    */

    let _token = '';

    const _user: User = {
        firstname: 'jon',
        lastname: 'doe',
        username: 'jondoe',
        password: 'starship'
    };

    describe('User endpoints', () => {
        it('test create route: "/users" [POST] ', async () => {
            const response = await request
                .post('/users')
                .send(_user)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            _token = response.body;
        });

        it('test index route: "/users" [GET] ', async () => {
            const response = await request
                .get('/users')
                .set('authorization', `Bearer ${_token || config.signedToken}`);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeDefined();

            const arr = response.body as User[],
                aUser = arr.find((n) => n.username === _user.username);

            expect(aUser).toBeTruthy();
            _user.id = aUser?.id;
            _user.password = String(aUser?.password);
        });

        it('test show route: "/users/:id" [GET]', async () => {
            const response = await request
                .get(`/users/${_user.id}`)
                .set('authorization', `Bearer ${_token || config.signedToken}`);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            expect(response.body).toEqual(_user);
        });
    });

    /*
        Category object to be used in subsequent test routes
    */

    const _category: Category = {
        name: 'cat items',
        description: 'toys, food, any items related to cats'
    };

    describe('Category endpoints', () => {
        it('test create route: "/category" [POST] ', async () => {
            const response = await request
                .post('/category')
                .send(_category)
                .set('Content-Type', 'application/json');

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            _category.id = (response.body as Category).id;
        });

        it('test index route: "/category" [GET] ', async () => {
            const response = await request.get('/category');

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();

            const categoryArray = response.body as Category[],
                aCategory = categoryArray.find((n) => n.id === _category.id);

            expect(aCategory).toBeTruthy();
        });
    });

    /*
        Product object to be used in subsequent test routes
        please note - the id added was a way for me to manually test a product from..
        my database without having to continually create products
    */

    const _product: Product = {
        name: 'rolling ball',
        price: 20,
        categoryId: 0,
        id: '15'
    };

    describe('Product endpoints', () => {
        it('test create route: "/products" [POST] ', async () => {
            _product.categoryId = parseInt(String(_category.id));
            const response = await request
                .post('/products')
                .send(_product)
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${_token || config.signedToken}`);

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            _product.id = (response.body as Product).id;
        });

        it('test index route: "/products" [GET] ', async () => {
            const response = await request.get('/products');

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();

            const productsArray = response.body as Product[],
                aProduct = productsArray.find((n) => n.id == _product.id);

            expect(aProduct).toBeTruthy();
        });

        it('test show route: "/products/:id" [GET] ', async () => {
            const response = await request.get(`/products/${_product.id}`);

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            expect((response.body as Product).name).toEqual(_product.name);
        });

        it('test "products by category" route: "/productsbycategory/:categoryId" [GET]', async () => {
            const response = await request.get(`/productsbycategory/${_category.id}`);

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            expect((response.body as Product[]).length).toBeGreaterThanOrEqual(1);
        });
    });

    /*
        Order object to be used in subsequent test routes
    */

    let _order: Order = {
        id: '0',
        user_id: '0',
        status: 'active'
    };

    describe('Order endpoints', () => {
        it('test create route: "/orders/:user_id" [POST]', async () => {
            const response = await request
                .post(`/orders/${_user.id}`)
                .set('authorization', `Bearer ${_token || config.signedToken}`);

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            _order = response.body;
        });

        it('test "Current Order by user" route: "/orderbyuser/:user_id" [GET]', async () => {
            const response = await request
                .get(`/orderbyuser/${_user.id}`)
                .set('authorization', `Bearer ${_token || config.signedToken}`);

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            expect(response.body).toEqual(_order);
        });

        it('test "add product to order" route: "/orders/:id/products" [POST] ', async () => {
            const orderProduct = {
                order_id: String(_order.id),
                product_id: String(_product.id),
                quantity: 1
            };

            const response = await request
                .post(`/orders/${orderProduct.order_id}/products`)
                .send({
                    product_id: orderProduct.product_id,
                    quantity: 1
                })
                .set('Content-Type', 'application/json');

            _log(response);
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toBeTruthy();
            expect(response.body).toEqual(orderProduct);
        });
    });
});

import supertest from 'supertest';
import app from '../src/server';
import { config } from '../config';
import _log from './util/util';
import { Product } from '../src/models/product';

const request = supertest(app);

describe('just a custom endpoint test', () => {
    it('should perform the root test route: "/test" [GET]', async () => {
        const response = await request.get('/test');
        expect(response.status).toBe(200);
        console.log(response.body);
    });

    it('should retrieve all products by the product index route: "/products" [GET] ', async () => {
        const response = await request.get('/products');

        _log(response);
        expect(response.status).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body).toBeTruthy();
        console.log(response.body);
    });
});

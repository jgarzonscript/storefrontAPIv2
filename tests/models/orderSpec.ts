import { Order, OrderStore } from '../../src/models/order';
import { ProductStore } from '../../src/models/product';
import { User, UserStore } from '../../src/models/user';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Orders model', () => {
    it('should have an orderbyuser method', () => {
        expect(orderStore.orderByUser).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should have an addProduct method', () => {
        expect(orderStore.addProduct).toBeDefined();
    });

    let user: User;
    let _order: Order;
    it('create method should add an order', async () => {
        /*
            pre-execution data needed - retrieve a user first
        */

        const result = await userStore.index();
        expect(result).toBeTruthy();
        user = result[0];

        const newOrder = await orderStore.create(String(user.id));

        expect(newOrder).toBeDefined();
        expect(newOrder.user_id).toEqual(String(user.id));
        expect(newOrder.status).toEqual('active');
        _order = newOrder;
    });

    it('orderbyuser method should return an order', async () => {
        const orderbyuser: Order = await orderStore.orderByUser(String(user.id));
        expect(orderbyuser).toBeTruthy();
        expect(orderbyuser.id).toBeGreaterThanOrEqual(1);
        expect(orderbyuser.user_id).toEqual(String(user.id));
        expect(orderbyuser.status).toEqual('active');
    });

    it('addProduct method should add a product to an order', async () => {
        // (Preliminary Initialization -> retrieve a product record)

        const products = await productStore.index();
        expect(products).toBeTruthy();

        // continue with addProduct

        const result = await orderStore.addProduct(_order.id, String(products[0].id), '3');
        expect(result).toBeTruthy();
    });
});

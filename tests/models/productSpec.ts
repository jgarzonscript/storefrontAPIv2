import { Category, CategoryStore } from '../../src/models/category';
import { Product, ProductStore } from '../../src/models/product';

const store = new ProductStore();
const catStore = new CategoryStore();

let category: Category;

describe('Products Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a popularProducts method', () => {
        expect(store.popularProducts).toBeDefined();
    });

    it('should have a productsByCategory method', () => {
        expect(store.productsByCategory).toBeDefined();
    });

    let _product: Product;
    it('create method should add a new product', async () => {
        /*
            preliminary data needs to be fetched first > 
            retrieve a category record
        */

        const result = await catStore.index();

        expect(result).toBeTruthy();
        category = result[0];

        // now continue with create method...

        const product: Product = {
            name: 'mirror',
            price: 12,
            categoryId: parseInt(String(category.id))
        };

        _product = await store.create(product);
        expect(_product).toBeDefined();
        expect(_product.id).toBeGreaterThanOrEqual(1);
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
        expect(result).toEqual([_product]);
    });

    it('show method should retrieve the correct product', async () => {
        const result = await store.show(String(_product.id));
        expect(result).toBeTruthy();
        expect(result.id).toEqual(_product.id);
        _product.seen = result.seen; // need to update the seen property to our initial product.
    });

    it('popular-products method should return a list of products', async () => {
        const result = await store.popularProducts();
        expect(result).toBeTruthy();
        expect(result).toContain(_product);
    });

    it('products_by_category method should return a list of products from that category', async () => {
        const result = await store.productsByCategory(String(category.id));
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result).toContain(_product);
    });
});

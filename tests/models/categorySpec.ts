import { Category, CategoryStore } from '../../src/models/category';

const store = new CategoryStore();

describe('Category Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    let _category: Category;
    it('create method should add a new category', async () => {
        const category: Category = {
            name: 'kids toys',
            description: 'toys for kids under 10'
        };

        _category = await store.create(category);
        expect(_category).toBeDefined();
        expect(_category.id).toBeGreaterThanOrEqual(1);
    });

    it('index method should return a list of categories', async () => {
        const result = await store.index();
        expect(result).toEqual([_category]);
    });
});

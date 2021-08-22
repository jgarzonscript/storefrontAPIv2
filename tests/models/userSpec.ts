import { User, UserStore } from '../../src/models/user';

const store = new UserStore();

describe('Users Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    let user: User;

    it('create method should add a new User', async () => {
        const addThisUser: User = {
            firstname: 'foo',
            lastname: 'bar',
            username: 'foobar',
            password: 'foobar1'
        };

        const result = await store.create(addThisUser);
        expect(result).toBeDefined();
        expect(result.id).toBeGreaterThanOrEqual(1);
        user = result;
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([user]);
    });

    it('show method should retrieve the correct user', async () => {
        const result = await store.show(String(user.id));
        expect(result).toEqual(user);
    });
});

import { Response } from 'supertest';

const log = (resp: Response) => {
    if (resp.statusCode != 200) {
        console.log(resp.body);
    }
};

export default log;

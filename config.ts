import { config as _conf } from 'dotenv';

_conf();

export const port = process.env.PORT;

class Config {
    private ENVIRONMENT = 'ENV';
    private HOST = 'POSTGRES_HOST';
    private USER = 'POSTGRES_USER';
    private DATABASE = 'POSTGRES_DB';
    private DATABASE_DEV = 'POSTGRES_DB_DEV';
    private DATABASE_TEST = 'test_POSTGRES_DB';

    private BCRYPT = 'BCRYPT_PASSWORD';
    private SALT = 'SALT_ROUNDS';
    private TOKENSECRET = 'TOKEN_SECRET';

    get env(): string {
        return String(process.env[this.ENVIRONMENT]);
    }

    get host(): string {
        return String(process.env[this.HOST]);
    }

    get user(): string {
        return String(process.env[this.USER]);
    }

    get database(): string {
        let db = String(process.env[this.DATABASE]);

        // retrieves dev database if environment is 'dev'
        if (this.env === 'dev' && process.env[this.DATABASE_DEV]) {
            db = String(process.env[this.DATABASE_DEV]);
        }

        // retrieves test database if environment is 'test'
        if (this.env.toLowerCase() === 'test' && process.env[this.DATABASE_TEST]) {
            db = String(process.env[this.DATABASE_TEST]);
        }

        return db;
    }

    get pepper(): string {
        return String(process.env[this.BCRYPT]);
    }

    get saltRounds(): string {
        return String(process.env[this.SALT]);
    }

    get tokenSecret(): string {
        return String(process.env[this.TOKENSECRET]);
    }
}

export const config = new Config();

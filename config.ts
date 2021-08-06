import { config as _conf } from 'dotenv';

_conf();

export const port = process.env.PORT;

class Config {
    private ENVIRONMENT = 'ENV';
    private HOST = 'POSTGRES_HOST';
    private USER = 'POSTGRES_USER';
    private DATABASE = 'POSTGRES_DB';
    private DATABASE_DEV = 'POSTGRES_DB_DEV';
    // private BCRYPT = 'BCRYPT_PASSWORD';
    // private SALT = 'SALT_ROUNDS';
    // private TOKENSECRET = 'TOKEN_SECRET';

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
        if (this.env === 'dev' && process.env[this.DATABASE_DEV]) {
            db = String(process.env[this.DATABASE_DEV]);
        }
        return db;
    }
}

export const config = new Config();

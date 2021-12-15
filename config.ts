import { config as _conf } from 'dotenv';

_conf();

export const port = process.env.PORT || 5000;

class Config {
    private ENVIRONMENT = 'NODE_ENV';
    private HOST = 'PG_HOST';
    private USER = 'PG_USER';
    private DATABASE = 'PG_DB';
    private PASS = 'PG_PWD';
    // private DATABASE_DEV = 'POSTGRES_DB_DEV';
    private DATABASE_TEST = 'PG_DB_TEST';

    private BCRYPT = 'BCRYPT_PASSWORD';
    private SALT = 'SALT_ROUNDS';
    private TOKENSECRET = 'TOKEN_SECRET';
    private SIGNEDTOKEN = 'TOKEN_SIGNED';

    get env(): string {
        return String(process.env[this.ENVIRONMENT]);
    }

    get host(): string {
        return String(process.env[this.HOST]);
    }

    get user(): string {
        return String(process.env[this.USER]);
    }

    get pass(): string {
        return String(process.env[this.PASS]);
    }

    get database(): string {
        let db = String(process.env[this.DATABASE]);

        // retrieves test database if environment is 'test'
        if (this.env.toLowerCase() === 'test' && process.env[this.DATABASE_TEST]) {
            db = String(process.env[this.DATABASE_TEST]);
        }

        return db;
    }

    get connectionString(): string {
        let databaseURL = <string>process.env.DATABASE_URL,
            isProduction = this.env === 'production';

        // if (isProduction) {
        //     databaseURL = `${databaseURL}?sslmode=require`;
        // }
        return databaseURL;
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

    // this is deprecated
    // TO-DO : remove and de-commission
    get signedToken(): string {
        return String(process.env[this.SIGNEDTOKEN]);
    }
}

export const config = new Config();

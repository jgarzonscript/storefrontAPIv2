# Storefront Backend Project

This api is configured to handle a storefront website.

A JavaScript API based on a requirements given by the stakeholders. The following has been setup, database, tables, and columns to fulfill the requirements. A RESTful API is accessible to the frontend developer. The following project features: written tests, secured user information with encryption, and tokens for integration into the frontend.

## Getting Started

We need to setup a few items to get started

-   setup our database
-   configure our connection strings via environmental variables
-   setup the server

### Setup our database

connect to your postgres server [ main database ] via commandline as a superuser - or - a user with createdb role

```
psql postgres
```


create the user AND database:

```
CREATE USER <postgres user> WITH PASSWORD 'password123';
CREATE DATABASE <postgres database>;
GRANT ALL PRIVILEGES ON DATABASE <postgres database> TO <postgres user>;
```


// the following test database settings are optional!
create the test database and grant access:

```
CREATE DATABASE <postgress test database>;
GRANT ALL PRIVILEGES ON DATABASE <postgress test database> TO <postgres user>;
```

### Setup our environmental variables and connection strings

Inside our project, rename file '.env.dummy' to just '.env'
set the following environmental variables:

```
DATABASE_URL=<postgresql://username:password@localhost:5432/mydb>
<!-- PG_DB=<database name>
PG_USER=<postgres user>
PG_PWD=<postgres pass> -->

<!-- PG_DB_TEST=<postgres test database>  // not required unless running tests -->
```

set the following encryption keys:

```
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=
```

### Setup the server

Install all modules

```
npm install
```


Have db-migrate provision all the tables in postgres

```
npm run dbmigrateup
```


Start the server

```
npm start // normal startup
npm run nodemon // nodemon init
```


Your api server is ready @ port 3000:

```
http://localhost:3000/
```

<!-- ### Running Tests

Run the following to start the tests:

```
yarn run test
``` -->

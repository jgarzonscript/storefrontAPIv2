# Storefront Backend Project

This api is configured to handle a storefront website.

A JavaScript API based on a requirements given by the stakeholders. The following has been setup, database, tables, and columns to fulfill the requirements. A RESTful API is accessible to the frontend developer. The following project features: written tests, secured user information with encryption, and tokens for integration into the frontend.

## Getting Started

We need to setup a few items to get started

-   setup our database
-   configure our connection strings via environmental variables
-   setup the server

### Setup our database

connect to your postgres server:

```
psql postgres
```

<br>
 create the user AND database:

```
CREATE USER <postgres user> WITH PASSWORD 'password123';
CREATE DATABASE <postgres database>;
GRANT ALL PRIVILEGES ON DATABASE <postgres database> TO <postgres user>;
```

### Setup our environmental variables and connection strings

Inside our project, rename file '.env.dummy' to just '.env'<br>
set the following environmental variables:

```
DATABASE_URL=<postgresql://username:password@localhost:5432/mydb>
```
<br>
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

<br>
Have db-migrate provision all the tables in postgres

```
npm run dbmigrateup
```

<br>
Start the server

```
npm start // normal startup
npm run nodemon // nodemon init
```

<br>
Your api server is ready @ port 3000:

```
http://localhost:3000/
```

<!-- ### Running Tests

Run the following to start the tests:

```
yarn run test
``` -->

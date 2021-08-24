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

lets now create the user AND databases we will need for the project

```
CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_dev;
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
```

lets create the test database and grant access to the test database too.

```
CREATE DATABASE full_stack_test;
GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;
```

lets write down our setup so we can configure the environmental variables in our project.

-   user = full_stack_user
-   dev database = full_stack_dev
-   test database = full_stack_test

### Setup our environmental variables and connection strings

Inside our project, open the file: .env.dummy
let's rename this file to be: .env
now lets configure it afer the renaming

set the following values to the keys:

```
PG_DB=full_stack_dev
PG_USER=full_stack_user
PG_PWD=password123

PG_DB_TEST=full_stack_test
```

now is a good time to configure encryption for passwords and jwt for tokens.
configure values to the following keys inside the '.env' file:

```
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=
```

### Setup the server

Run yarn to install the necessary modules

```
yarn
```

Run the following script to create all your tables

```
yarn run create-dba
```

Run the following script to initiate the server and get it running

```
yarn watch
or
yarn start
```

You should now have access to the api server via all endpoints in the requirements file

```
http://localhost:3000/
```

### Running Tests

Run the following to start the tests:

```
yarn run test
```

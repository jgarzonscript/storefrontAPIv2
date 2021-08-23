# Storefront Backend Project

This api is configured to handle a storefront website.

A JavaScript API based on a requirements given by the stakeholders. The following has been setup, database, tables, and columns to fulfill the requirements. A RESTful API is accessible to the frontend developer. The following project features: written tests, secured user information with encryption, and tokens for integration into the frontend.

## Getting Started

Run yarn to install the necessary modules

```
$ yarn
```

Configure the .env file.
A dummy .env file has been provided with the necessary keys, ".env.dummy"
add a '.env' file to the project, with the same keys and configure all keys.
key 'POSTGRES_DB_DEV' can be left blank. Not being used at this moment.

-   there is no password for the database user.

Start-up the server

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

To run the tests, make sure all modules have been installed by running 'yarn'

-   Make sure key 'test_POSTGRES_DB' in .env file, points to a test database.
-   the test database and regular dev database is configured to the same user (IE: key 'POSTGRES_USER')
-   no database user password configured.

To initiate the tests:

```
yarn run test
```

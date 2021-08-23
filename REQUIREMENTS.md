# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index : '/products' [GET]
-   Show : '/products/:id' [GET]
-   Create [token required] : '/products' [POST]
-   [OPTIONAL] Top 5 most popular products : '/popularproducts' [GET]
-   [OPTIONAL] Products by category (args: product category) : '/productsbycategory/:categoryId' [GET]

#### Users

-   Index [token required] : '/users' [GET]
-   Show [token required] : '/users/:id' [GET]
-   Create N[token required] : '/users' [POST]

#### Orders

-   Current Order by user (args: user id)[token required] : '/orderbyuser/:user_id' [GET]
-   [OPTIONAL] Completed Orders by user (args: user id)[token required] : N/A

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category

Table: Products (id:integer, name:varchar, price:integer, category_id:bigint[foreignkey to category table], seen:integer)

Table: Category (id:integer, name:varchar[UNIQUE], description:text)

#### User

-   id
-   firstName
-   lastName
-   password

Table: Users (id:integer, firstname:varchar, lastname:varchar, password:varchar, username:varchar[UNIQUE])

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

Table: Orders (id:integer, user_id:bigint[foreignkey to users table], status:varchar)

Table: Order_products (order_id:bigint[FOREIGN KEY to table orders(id)], product_id:bigint[FOREIGN KEY to table products(id)], quantity:integer)

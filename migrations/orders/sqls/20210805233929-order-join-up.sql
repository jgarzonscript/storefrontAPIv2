/* Replace with your SQL commands */

CREATE TABLE order_products (
order_id BIGINT NOT NULL,
product_id BIGINT NOT NULL,
PRIMARY KEY (order_id, product_id),
FOREIGN KEY (order_id) REFERENCES orders (id),
FOREIGN KEY (product_id) REFERENCES products (id),
quantity INTEGER NOT NULL
);
/* Replace with your SQL commands */

CREATE TABLE orders (
id serial PRIMARY KEY,
user_id BIGINT REFERENCES users (id),
status VARCHAR NOT NULL
);
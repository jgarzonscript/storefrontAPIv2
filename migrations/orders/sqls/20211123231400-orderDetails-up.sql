/* Replace with your SQL commands */

create table ordersDetail (
    OrdersDetailId serial PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    constraint fk_orders FOREIGN KEY (order_id) REFERENCES orders (id),
    constraint fk_products FOREIGN KEY (product_id) REFERENCES products (id),
    quantity INTEGER NOT NULL
);
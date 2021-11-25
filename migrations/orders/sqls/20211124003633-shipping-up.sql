/* Replace with your SQL commands */

create table shipping (
    id serial primary key,
    order_id BIGINT NOT NULL,
    fullname varchar not null,
    myaddress varchar not null,
    constraint fk_orders FOREIGN KEY (order_id) REFERENCES orders (id)
);
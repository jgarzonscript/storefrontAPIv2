/* Replace with your SQL commands */

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    category_id BIGINT REFERENCES category (id),
    seen INTEGER,
    url VARCHAR,
    description text
);

/* insert statements for dog products */

-- INSERT INTO products ( name, price, category_id) VALUES ( 'bed', 25, (select id from category where name = 'small dogs')) RETURNING id;
-- INSERT INTO products ( name, price, category_id) VALUES ( 'bed', 50, (select id from category where name = 'larger dogs')) RETURNING id;
-- INSERT INTO products ( name, price, category_id) VALUES ( 'chewy bone', 10, (select id from category where name = 'larger dogs')) RETURNING id;
-- INSERT INTO products ( name, price, category_id) VALUES ( 'tiny snacks', 12, (select id from category where name = 'small dogs')) RETURNING id;
-- INSERT INTO products ( name, price, category_id) VALUES ( 'fetch ball', 20, (select id from category where name = 'larger dogs')) RETURNING id;
-- INSERT INTO products ( name, price, category_id) VALUES ( 'small frisbee', 30, (select id from category where name = 'small dogs')) RETURNING id;

/* end of statements */

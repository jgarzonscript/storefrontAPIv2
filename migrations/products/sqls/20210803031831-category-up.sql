/* Replace with your SQL commands */

CREATE TABLE category (
    id serial PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    description text
);

INSERT INTO category (name, description) VALUES ('small dogs', 'small dogs at 30 pounds or less') RETURNING id;

INSERT INTO category (name, description) VALUES ('larger dogs', 'medium to larger dogs at 30 pounds or greater') RETURNING id;

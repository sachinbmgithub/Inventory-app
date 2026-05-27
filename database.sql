CREATE DATABASE inventory_db;

USE inventory_db;


CREATE TABLE item_types (

    id INT AUTO_INCREMENT PRIMARY KEY,

    type_name VARCHAR(100) NOT NULL

);


INSERT INTO item_types (type_name)
VALUES
('Electronics'),
('Furniture'),
('Clothing'),
('Groceries');



CREATE TABLE items (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    purchase_date DATE NOT NULL,

    stock_available BOOLEAN DEFAULT FALSE,

    item_type_id INT,

    FOREIGN KEY (item_type_id)
    REFERENCES item_types(id)

);

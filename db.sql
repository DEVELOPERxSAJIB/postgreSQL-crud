-- For create a database
CREATE DATABASE bookDB; (bookDB => database name)

-- For drop the database
DROP DATABASE bookDB; 

-- Delete a table
DROP TABLE book; (book => table name)

-- Createing a table
CREATE TABLE book (
    -- stracture --> col_name : datatype (size)
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(255)
);

-- Inserting data into table
INSERT INTO book (id, name, description)
VALUES
(101, X, beautifulBook), -- row inserted
(102, Y, Attractive Book); -- row
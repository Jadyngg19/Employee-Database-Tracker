-- Drop existing tables
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create department table
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create role table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Insert sample data
INSERT INTO department (name) VALUES
    ('Finance'),
    ('Sales'),
    ('Marketing'),
    ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES
    ('Accountant', 60000, 1),
    ('Financial Analyst', 70000, 1),
    ('Sales Representative', 50000, 2),
    ('Sales Manager', 80000, 2),
    ('Marketing Specialist', 55000, 3),
    ('Marketing Manager', 85000, 3),
    ('Software Engineer', 90000, 4),
    ('Senior Software Engineer', 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Jadyn', 'Gomez', 1, NULL),
    ('Alex', 'Gaskins', 2, 1),
    ('Mike', 'Ehrmantraut', 3, 1),
    ('Walter', 'White', 4, 2),
    ('John', 'Oliveira', 5, 1),
    ('Thomas', 'Whittle', 6, 5),
    ('Michael', 'Dasaro', 7, 5),
    ('Nikola', 'Ciric', 8, 7);

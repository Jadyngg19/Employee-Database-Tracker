INSERT INTO departments (name) VALUES
('Sales'),
('Engineering'),
("Marketing");

INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 10000, 1),
('Sales Representative', 50000, 1),
('Software Engineer', 80000, 2),
('Front-end Developer', 70000, 2),
('Marketing Manager', 90000, 3),
('Marketing Coordinator', 50000, 3);

INSERT INTO employees (first_name, last_name, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, 1),
('Charlie', 'Brown', 3, 1),
('Dave', 'Lee', 4, 2),
('Eve', 'Clark', 5, 3),
('Frank', 'Wu', 6, 3),
('George', 'Thomas', 3, NULL);
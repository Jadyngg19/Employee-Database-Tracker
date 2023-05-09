const inquirer = require('inquirer');
const mysql2 = require('mysql');

// Creating the connection to the Database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Red&Blue2001$$$',
    database:'Employee-Database-Tracker_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('You are connected to the Employee-Database-Tracker_db!');
    start ();
});

function start() {
    inquirer.createPromptModule([
    {
        type: 'list',
        message: 'Please select what you would like to do.',
        choices: [
            'View all departments',
            'View all employee roles',
            'View all employees',
            'Add a department',
            'Add an employee role',
            'Add an employee',
            'Update an employee role'
        ]
    }
    // Calling the right function based on what the user chooses
    ]).then((answer) => {
        switch (answer.sction) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all employee roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add an employee role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            default:
                console.log(`Invalid action: ${answer.sction}`);
        }
    });
}

// Creating the functions
function viewAllDepartments() {
    const query = `
    SELECT id, name
    FROM departments
    ORDER By id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Renders the results as a table
        console.table(res);
        // Returns to the main menu
        start();
    });
}

function viewAllRoles() {
    const query = `
    SELECT r.id, r.title. d.name AS department, r.salary
    FROM roles r
    INNER JOIN departments d ON r.department_id = d.id
    ORDER BY r.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.ttle AS role, d.name AS deparment, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    INNER JOIN roles r ON e.role_id = r.id
    INNER JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees ON e.manager_id = m.id
    ORDER BY e.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}
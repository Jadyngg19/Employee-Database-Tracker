const inquirer = require('inquirer');
const { query } = require('./db');

// Function to display the main menu
function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update an employee role',
            'Exit'
          ]
        }
      ])
      .then(answer => {
        switch (answer.action) {
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            console.log('Goodbye!');
            process.exit();
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
        process.exit(1);
      });
  }
  
  // Function to view all employees
  function viewAllEmployees() {
    const sql = `
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      INNER JOIN role r ON e.role_id = r.id
      INNER JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `;
  
    query(sql)
      .then(results => {
        console.table(results);
        mainMenu();
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }
  
  // Function to view all departments
  function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
  
    query(sql)
      .then(results => {
        console.table(results);
        mainMenu();
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }
  
  // Function to view all roles
  function viewAllRoles() {
    const sql = `
      SELECT r.id, r.title, r.salary, d.name AS department
      FROM role r
      INNER JOIN department d ON r.department_id = d.id
    `;
  
    query(sql)
      .then(results => {
        console.table(results);
        mainMenu();
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }
  
  function addEmployee() {
    // Fetch the list of roles from the database
    const getRolesSql = `SELECT id, title FROM role`;
  
    query(getRolesSql)
      .then(roles => {
        // Prompt user to enter employee details
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: "Enter the employee's first name:"
            },
            {
              type: 'input',
              name: 'lastName',
              message: "Enter the employee's last name:"
            },
            {
              type: 'list',
              name: 'roleId',
              message: "Select the employee's role:",
              choices: roles.map(role => ({
                name: role.title,
                value: role.id
              }))
            }
          ])
          .then(answers => {
            // Insert the employee into the database
            const insertEmployeeSql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
            const values = [answers.firstName, answers.lastName, answers.roleId];
  
            query(insertEmployeeSql, values)
              .then(() => {
                console.log('Employee added successfully!');
                mainMenu();
              })
              .catch(error => {
                console.log('An error occurred:', error);
                mainMenu();
              });
          })
          .catch(error => {
            console.log('An error occurred:', error);
            mainMenu();
          });
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }   

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the department name:'
        }
      ])
      .then(answers => {
        const { name } = answers;
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const values = [name];
  
        query(sql, values)
          .then(() => {
            console.log('Department added successfully!');
            mainMenu();
          })
          .catch(error => {
            console.log('An error occurred:', error);
            mainMenu();
          });
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }   

  function addRole() {
    // Fetch the list of departments from the database
    const getDepartmentsSql = `SELECT id, name FROM department`;
  
    query(getDepartmentsSql)
      .then(departments => {
        const departmentChoices = departments.map(department => ({
          name: department.name,
          value: department.id
        }));
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: "Enter the role's title:"
            },
            {
              type: 'input',
              name: 'salary',
              message: "Enter the role's salary:"
            },
            {
              type: 'list',
              name: 'departmentId',
              message: "Select the department for the role:",
              choices: departmentChoices
            }
          ])
          .then(answers => {
            const { title, salary, departmentId } = answers;
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const values = [title, salary, departmentId];
  
            query(sql, values)
              .then(() => {
                console.log('Role added successfully!');
                mainMenu();
              })
              .catch(error => {
                console.log('An error occurred:', error);
                mainMenu();
              });
          })
          .catch(error => {
            console.log('An error occurred:', error);
            mainMenu();
          });
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }   

// Function to update an employee's role
function updateEmployeeRole() {
    // Get the list of employees from the database
    const getEmployeesSql = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`;
  
    query(getEmployeesSql)
      .then(employees => {
        // Prompt user to select an employee
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employeeId',
              message: 'Select the employee to update:',
              choices: employees.map(employee => ({
                name: employee.name,
                value: employee.id
              }))
            }
          ])
          .then(employeeAnswer => {
            // Get the list of roles from the database
            const getRolesSql = `SELECT id, title FROM role`;
  
            query(getRolesSql)
              .then(roles => {
                // Prompt user to select a new role
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      name: 'roleId',
                      message: 'Select the new role:',
                      choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                      }))
                    }
                  ])
                  .then(roleAnswer => {
                    // Update the employee's role in the database
                    const updateRoleSql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                    const values = [roleAnswer.roleId, employeeAnswer.employeeId];
  
                    query(updateRoleSql, values)
                      .then(() => {
                        console.log('Employee role updated successfully!');
                        mainMenu();
                      })
                      .catch(error => {
                        console.log('An error occurred:', error);
                        mainMenu();
                      });
                  })
                  .catch(error => {
                    console.log('An error occurred:', error);
                    mainMenu();
                  });
              })
              .catch(error => {
                console.log('An error occurred:', error);
                mainMenu();
              });
          })
          .catch(error => {
            console.log('An error occurred:', error);
            mainMenu();
          });
      })
      .catch(error => {
        console.log('An error occurred:', error);
        mainMenu();
      });
  }   

// Start the application
mainMenu();

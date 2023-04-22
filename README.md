# Team 11 Post Office NodeJS Middleware Server

This project follows the MVC (Model/View/Controller)\
design pattern to handle HTTP requests. The App.js\
contains the routes that are available.

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

### `nodemon start` (development)

## Available Routes

Routes by HTTP method that are handled. All routes that receive data
receive it in JSON.

**GET ROUTES**

/api/users
get all users

/api/customers
get all customers

/api/shipments
get all shipments

/api/employees
get all employees

/api/po-boxes
get all po boxes

/api/tracks
get all tracking data

/api/job
get all jobs for employees

/api/loc-history
gets all location history

**POST ROUTES**

/api/userinfo
returns user information by id input
request ex: { "email": "foam@gmail.com" }

/api/employee-info
returns employee data by email input
request ex: { "email": "lampeater44@hotmail.com" }

/api/userbox
return box number and branch address by email
Provide request with
'email'.

/api/shipment - returns shipment info with id input - request ex:

{
"tracking_id": 111
}

/api/register-customer
creates customer object
request ex:
{
"email": "foam@gmail.com",
"password": "thepassword",
"first_name": "Foam",
"last_name": "Eraser",
"home_address": "123 Foamy St"
}

/api/register-employee - Registers an employee - Provide request with
`email`, `password`, `first_name`, `last_name`, `branch_address`,
`phone_number`, `start_date` attributes in JSON.

/api/login
logs in a user
request ex: { "email": "lampeater44@hotmail.com", "password": "password" }

/api/create-shipment - Creates a shipment - Provide request with
`tracking_id`, `creation_date`, `current_location`, `shipment_status`,
`num_packages`, `region`, `customer_email`, `employee_email`.

/api/add-tracks - Creates a tracks table entry. Should not be
necessary to directly use as create-shipment handles tracking
creation, but if necessary, provide `tracking_id`, `customer_email`,
`employee_email`.

/api/user-shipments
return a shipment by user email
Provide request with
'email'.

/api/job
create job
Provide request with
'work_name', 'employee_email', 'pay', 'hours_worked', 'on_date'

/api/get-job-with-id
returns job information by id input
request ex: { "id": 1 }

/api/self-report
return payroll report of an employee
request ex:
{
"tracking_id": 111
}

/api/loc-history-id
return location history of a shipment by tracking id
request ex:
{
"tracking_id": 111
}

/api/shipment-report
return shipment report of all shipments by date range
request ex:
{
"start_date": "2023-01-01",
"end_date": "2023-12-01"
}

/api/employee-report
return employee work report for all employees by date range
request ex:
{
"start_date": "2023-01-01",
"end_date": "2023-12-01"
}

**PUT ROUTES**

/api/delete-shipment - deletes a shipment - Provide request with
`tracking_id` and `mark_deletion` (0 or 1, 1 for deleted).

/api/update-status - updates the status of a shipment - Provide
request with `tracking_id`, `key`, and `new_value`.

/api/update-shipment
updates shipment by tracking id and column
request ex:
{
"tracking_id": 111,
"key": "shipment_status",
"new_value": "Delivered"
}

/api/update-employee - Updates a detail about an employee - Provide
`email`, `key`, and `new_value`.

/api/update-customer - Updates a detail about a customer - Provide
`email`, `key`, and `new_value`.

/api/update-job - Updates a detail about a job - Provide
`email`, `key`, and `new_value`.

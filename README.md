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

Routes by HTTP method that are handled.

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

/api/shipment
returns shipment info with id input
request ex: { "tracking_id": 111 }

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

/api/register-employee

/api/login
logs in a user
request ex: { "email": "lampeater44@hotmail.com", "password": "password" }

/api/create-shipment

/api/add-tracks

/api/user-shipments

/api/job

/api/get-job-with-id
returns job information by id input
request ex: { "id": 1 }

/api/self-report

/api/loc-history-id

/api/shipment-report

/api/employee-report


**PUT ROUTES**
/api/delete-shipment

/api/update-status

/api/update-shipment
updates shipment by tracking id and column
request ex:
{
	"tracking_id": 111,
	"key": "shipment_status",
	"new_value": "Delivered"
}

/api/update-employee

/api/update-customer

/api/update-job



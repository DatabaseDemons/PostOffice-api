//app.js


// TODO view/routes needed:
/* 

===GET routes/views===
[route]get all user logins.
[route]get all branches.
[route]get all customers (employee).
[route]get all employees (admin).
[route]get all po boxes.
[route]get all tracks.
[route]get all shipments.
[route]get shipment by tracking id.
[view]get all po boxes by customer email.
[view]get all po boxes by branch.
[view]get shipment by creation date (tracks -> shipment).
[view]get all shipments by customer email (first tracking table to get all 
                            tracking ids associated with that email. )
    - (get all shipments by employee email can be combo'd here).
[view]get employees by branch address (admin).

===POST routes/views===
[route]post a user login
[route]post a customer
[route]post a employee
[route]post a shipment (when a shipment is created by employee,
                 it attaches the employee email, customer email,
                 tracking status (hardcode this), creation date,
                 num packages, region (hardcode this), shipment status,
                 current location -> branch,
                )
    - when 10 shipments are in store and the 11th is made -> trigger (store is full).
NOTE -> PO boxes are initially hardcode (ex: branch A has 10 po boxes that are all unowned).
NOTE -> branches are hardcoded and the system will not control that.

===UPDATE/PUT/PATCH routes===
NOTE-> (no deletions will be made, we will mark it as deleted within the table)
[route]update shipment status (current location) -> trigger to send email.
[route]update shipment location.
[route]update po box customer email when bought.
[route]delete employee
[route]delete shipment

*/


const http = require("http");
const UserController = require("./controller");
const { getReqData } = require ("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

    //Testing home to return hello world
    if (req.url === "/" && req.method === "GET")
    {
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify("Hello World"));
    }

    // /api/users : GET
    else if (req.url === "/api/users" && req.method === "GET")
    {
        try {
            // get the users
            const users = await new UserController().getUsers();
            // set the status code, and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(users));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, {"Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({message: error}));
        }
    }

    // /api/users/:email : GET
    else if (req.url.match(/\/api\/users\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) && req.method === "GET") {
        try {

            // get email from url
            const email = req.url.split("/")[3];
            // get user
            const user = await new UserController().getUser(email);
            // set success status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(user));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, {"Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({message: error}));
        }
    }



    // /api/users/:id : DELETE
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete user
            let message = await new UserController().deleteUser(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/users/:id : UPDATE
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // update user
            let updated_user = await new UserController().updateUser(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_user));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/users/ : POST
    else if (req.url === "/api/users" && req.method === "POST") {
        // get the data sent along
        let user_data = await getReqData(req);
        // create the user
        let user = await new UserController().createUser(JSON.parse(user_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the user
        res.end(JSON.stringify(user));
    }


    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
//app.js

// TODO wrap routes to be protected for role based authentication
// TODO wrap any path.splits in here with try catch so we don't crash on a malformed url
// TODO view/routes needed:
/*

===GET routes/views===
[view]get all po boxes by customer email.

===POST routes/views===
[route]post login request -> responds with a token
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
const url = require('url');


const { UserController } = require("./Controllers/userController");
const { ShipmentController } = require("./Controllers/shipmentController");
const { POBoxController } = require("./Controllers/poBoxController");
const { TracksController } = require("./Controllers/tracksController");

const { authenticate, init_jwt } = require("./jwt");

const { getReqData } = require("./utils");
const { User } = require("./Models/user");
//USAGE: read JSON to parse ex:
//  const data = await getReqData(req);

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.path;
    const method = req.method;
    console.log(`Route hit: ${path}`);

    //Testing home to return 'Hello World'
    if (path === "/" && method === "GET") {
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify("Hello World"));
    }
    // /admin : GET profile page for admins
    else if (path === "/admin" && method === "GET")
    {
        try {
            //this is protecting the route (must have a JWT to access this and admin role)
            authenticate(req, res, 'admin');
            console.log(res.statusCode);
            if (res.statusCode > 400)
            {
                res.end("FORBIDDEN")
                return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end("SUCCESS");


        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, {"Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({message: ""+ error}));
        }

    }
    // /api/users : GET

    else if (path === "/api/users" && method === "GET") {

        try {
            // get the users
            const users = await new UserController().getAllUsers();
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(users));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }


    // /api/users/email : GET
    // Test with url http://localhost:5000/api/users/email/iamthestand@gmail.com
    else if (path.match(/\/api\/users\/email\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) && method === "GET") {
        try {

            // get email from url
            const email = path.split("/")[4];
            // get user
            const user = await new UserController().getUserByEmail(email);
            // set success status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(user));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    //Get all shipments route
    else if (path === "/api/shipments" && method === "GET") {
        try {
            let shipments = await new ShipmentController().getAllShipments();
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the shipments
            res.end(JSON.stringify(shipments));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    // api/shipments/id/ '' : GET
    // Get shipment by tracking ID route
    else if (path.match(/\/api\/shipments\/id\/[0-9]+/) && method === "GET") {
        try {
            let shipment = await new ShipmentController().getShipmentByID(path.split('/')[4]);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the shipments
            res.end(JSON.stringify(shipment));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    // api/po-boxes : GET
    // Get all po boxes route
    else if (path === "/api/po-boxes" && method === "GET") {
        try {
            let boxes = await new POBoxController().getAllPOBoxes();
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the boxes
            res.end(JSON.stringify(boxes));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    // /api/po-boxes/branch/ '' : GET
    // Get all po boxes by owning branch
    // Test with url http://localhost:5000/api/po-boxes/branch/123+Main+St
    else if (path.match(/\/api\/po-boxes\/branch\/([A-Za-z0-9]+(\+[A-Za-z0-9]+)+)/i) && method === "GET") {
        try {
            let branch = path.split('/')[4].replace(/\+/g, ' ');
            let branchBoxes = await new POBoxController().getAllPOBoxesByBranch(branch);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the boxes
            res.end(JSON.stringify(branchBoxes));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    // api/pox-boxes/email/ '' : GET
    // Get po box by owner's email
    // Test with url http://localhost:5000/api/po-boxes/email/iamthestand@gmail.com
    else if (path.match(/\/api\/po-boxes\/email\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) && method === "GET") {
        try {
            let boxes = await new POBoxController().getPOBoxByEmail(path.split("/")[4]);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the boxes
            res.end(JSON.stringify(boxes));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    // Get all tracks
    else if (path === "/api/tracks" && method === "GET") {
        try {
            let tracks = await new TracksController.getAllTracks();
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the tracks
            res.end(JSON.stringify(tracks));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }


    // /api/users/ : POST
    else if (path === "/api/register-customer" && method === "POST") {
        try {

            const data = await getReqData(req);

            console.log(data);
            //create the user first
            //create the customer next
            let result = await new UserController().createCustomer(data);
            

            //todo check the database with the user info
            const temp_user =
            {
                type: "admin"
            }
            console.log(init_jwt(temp_user));

            res.end(init_jwt(temp_user));


        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: error }));
        }


    }

    // /api/login : POST
    //TODO post request and verify req against database
    else if (path === "/api/login" && method === "GET") {
        
        try {
            //todo
            //receive email/password and check in db
            //create JWT and return it to the frontend
            // (then every protected route uses the JWT for its role)

            //todo check the database with the user info
            const temp_user = 
            {
                type: "admin"
            }
            console.log(init_jwt(temp_user));

            res.end(init_jwt(temp_user));

        } catch (error) {
            // set error status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: error }));
        }

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
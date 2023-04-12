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
// const PORT = process.env.PORT || 3000;


const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.path;
    const method = req.method;
    console.log(`Route hit: ${path}`);
    console.log(method);
    // HANDLE CORS PREFLIGHT REQUEST
    if (method === "OPTIONS")
    {
        res.writeHead(204, { 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":"GET, POST, DELETE, PUT, PATCH",
            "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, authorization",
            "Access-Control-Max-Age": 2592000
        });
        
        res.end();
        return;
    }
//GET HANDLERS
    //Testing home to return 'Hello World'
    else if (path === "/" && method === "GET") {
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify("Hello Post Office"));
    }
    //DEPRECATED
    // /admin : GET profile page for admins example -> wrap it for admin specific tasks
    // such as get employee data.
    // else if (path === "/api/admin" && method === "GET")
    // {
    //     try {
    //         // set the status code and content-type
    //         res.writeHead(200, { 
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         });
    //         //this is protecting the route (must have a JWT to access this and admin role)
    //         authenticate(req, res, 'admin');
    //         console.log(res.statusCode);
    //         if (res.statusCode > 400)
    //         {
    //             res.end("FORBIDDEN")
    //             return;
    //         }
    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         // send the data
    //         res.end("SUCCESS");


    //     } catch (error) {
    //         // set error status code and content-type
    //         res.writeHead(500, {"Content-Type": "application/json" });
    //         // send error
    //         res.end(JSON.stringify({message: ""+ error}));
    //     }
    // }
    
    // /api/users : GET
    else if (path === "/api/users" && method === "GET") {

        try {
            // set the status code and content-type
            res.writeHead(200, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            // get the users
            const users = await new UserController().getAllUsers();
            
            
            // send the data
            res.end(JSON.stringify(users));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    //DEPRECATED
    // /api/users/email : GET
    // Test with url http://localhost:5000/api/users/email/iamthestand@gmail.com
    // else if (path.match(/\/api\/users\/email\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) && method === "GET") {
    //     try {
    //         // set the status code and content-type
    //         res.writeHead(200, { 
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         });
    //         // send the data
            

    //         // get email from url
    //         const email = path.split("/")[4];
    //         // get user
    //         const user = await new UserController().getUserByEmail(email);
    //         // set success status code and content-type
            
    //         res.end(JSON.stringify(user));
    //     } catch (error) {
    //         // set error status code and content-type
    //         res.writeHead(500, { "Content-Type": "application/json" });
    //         // send error
    //         res.end(JSON.stringify({ message: "" + error }));
    //     }
    // }

    //Get all shipments route
    else if (path === "/api/shipments" && method === "GET") {
        try {
            // set the status code and content-type
            res.writeHead(200, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            let shipments = await new ShipmentController().getAllShipments();
            
            //send the shipments
            res.end(JSON.stringify(shipments));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    //DEPRECATED
    // api/shipments/id/ '' : GET
    // Get shipment by tracking ID route
    // else if (path.match(/\/api\/shipments\/id\/[0-9]+/) && method === "GET") {
    //     try {
    //         // set the status code and content-type
    //         res.writeHead(200, { 
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         });
    //         let shipment = await new ShipmentController().getShipmentByID(path.split('/')[4]);
            
    //         //send the shipments
    //         res.end(JSON.stringify(shipment));
    //     } catch (error) {
    //         // set error status code and content-type
    //         res.writeHead(500, { "Content-Type": "application/json" });
    //         // send error
    //         res.end(JSON.stringify({ message: "" + error }));
    //     }
    // }

    // api/po-boxes : GET
    // Get all po boxes route
    else if (path === "/api/po-boxes" && method === "GET") {
        try {
            // set the status code and content-type
            res.writeHead(200, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            let boxes = await new POBoxController().getAllPOBoxes();
            
            //send the boxes
            res.end(JSON.stringify(boxes));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    //DEPRECATED
    // /api/po-boxes/branch/ '' : GET
    // Get all po boxes by owning branch
    // Test with url http://localhost:5000/api/po-boxes/branch/123+Main+St
    // else if (path.match(/\/api\/po-boxes\/branch\/([A-Za-z0-9]+(\+[A-Za-z0-9]+)+)/i) && method === "GET") {
    //     try {
    //         // set the status code and content-type
    //         res.writeHead(200, { 
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         });
    //         let branch = path.split('/')[4].replace(/\+/g, ' ');
    //         let branchBoxes = await new POBoxController().getAllPOBoxesByBranch(branch);
            
    //         //send the boxes
    //         res.end(JSON.stringify(branchBoxes));
    //     } catch (error) {
    //         // set error status code and content-type
    //         res.writeHead(500, { "Content-Type": "application/json" });
    //         // send error
    //         res.end(JSON.stringify({ message: "" + error }));
    //     }
    // }

    //DEPRECATED
    // api/pox-boxes/email/ '' : GET
    // Get po box by owner's email
    // Test with url http://localhost:5000/api/po-boxes/email/iamthestand@gmail.com
    // else if (path.match(/\/api\/po-boxes\/email\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) && method === "GET") {
    //     try {
    //         // set the status code and content-type
    //         res.writeHead(200, { 
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         });
    //         let boxes = await new POBoxController().getPOBoxByEmail(path.split("/")[4]);
            
            
    //         //send the boxes
    //         res.end(JSON.stringify(boxes));
    //     } catch (error) {
    //         // set error status code and content-type
    //         res.writeHead(500, { "Content-Type": "application/json" });
    //         // send error
    //         res.end(JSON.stringify({ message: "" + error }));
    //     }
    // }

    // Get all tracks
    else if (path === "/api/tracks" && method === "GET") {
        try {
            // set the status code and content-type
            res.writeHead(200, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            let tracks = await new TracksController().getAllTracks();
            
            
            //send the tracks
            res.end(JSON.stringify(tracks));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }
//POST HANDLERS
    // Returns shipment with a tracking id input
    // /api/userinfo : POST
    else if (path === "/api/userinfo" && method === "POST") {
        try {
            // set the status code and content-type
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Request-Method", "POST");
            res.setHeader("Access-Control-Request-Headers", "Content-Type");
            
            // Receiving input data
            const data = await getReqData(req);
            
            const user_email = JSON.parse(data)
            //console.log(user_email);
            const user_info = await new UserController().getUserByEmail(user_email.email);
            //console.log(user_info);

            if (!user_info) {
                res.writeHead(404, { "Content-Type": "application/json" });
                // send error
                res.end(JSON.stringify(`No user found: ${user_email.email}`));
            }
            else {
                res.writeHead(202, { 
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                res.end(JSON.stringify(user_info));
            }
        } catch(error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    // Returns shipment with a tracking id input
    // /api/shipment : POST
    else if (path === "/api/shipment" && method === "POST") {
        try {
            // set the status code and content-type
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Request-Method", "POST");
            res.setHeader("Access-Control-Request-Headers", "Content-Type");
            
            const data = await getReqData(req);
            //const tracking_id = JSON.parse(data);
            
            const tracking_id = JSON.parse(data)
            console.log(tracking_id);
            const shipment = await new ShipmentController().getShipmentByID(tracking_id.tracking_id);
            console.log(shipment);

            if (!shipment) {
                res.writeHead(404, { "Content-Type": "application/json" });
                // send error
                res.end(JSON.stringify(`No shipment found with TID: ${tracking_id.tracking_id}`));
            }
            else {
                res.writeHead(202, { 
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                res.end(JSON.stringify(shipment));
            }
            
            
            

        } catch(error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: error.message }));
        }


    }

    // creates a customer with a user login
    // /api/register-customer : POST
    else if (path === "/api/register-customer" && method === "POST") {
        try {
            res.writeHead(201, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            const data = await getReqData(req);
            console.log(data);

            const result = await new UserController().createCustomer(data);
            // status code 201 -> created
            
            res.end(result);

        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error

            res.end(JSON.stringify({ message: error.message }));

        }
    }

    // /api/login : POST
    else if (path === "/api/login" && method === "POST") {
        try {
            res.writeHead(200, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            //receive email/password and check in db
            //create JWT and return it to the frontend
            // (then every protected route uses the JWT for its role)

            const data = await getReqData(req);
            const user = JSON.parse(data);
            // console.log(user);
            //get user.type from database
            const role = await new UserController().getUserType(user);
            // console.log(role);

            const verified_user = { ...user, ...role }
            //console.log(verified_user);
            if (!verified_user.type)
            {
                throw new Error('Wrong Email/Password Combination.');
            }

            //UNCOMMENT for debugging
            // const temp_user = 
            // {
            //     type: "admin"
            // }

            //console.log(init_jwt(verified_user));

            res.end(JSON.stringify( {token : init_jwt(verified_user), role : verified_user.type, email : verified_user.email } ));

        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: error.message }));
        }

    }

    // /api/create-shipment : POST
    // API route for creating a shipment in the database
    else if (path === "/api/create-shipment" && method === "POST") {
        try {
            // set the status code and content-type
            res.writeHead(201, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            const data = await getReqData(req);
            const result = await new ShipmentController().createShipment(data);

            res.end(result);
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: error.message }));
        }

    }

    //DEPRECATED on single use
    // /api/add-tracks : POST
    // API route for creating a tracks in the database
    else if (path === "/api/add-tracks" && method === "POST") {
        try {
            // set the status code and content-type
            res.writeHead(201, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            const data = await getReqData(req);
            const result = await new TracksController().createTracks(data);

            res.end(JSON.stringify(result));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    //given user email, retrieve : {shipment_tracking_id, tracking_status, est_delivery_date} from TRACKS, 
    // {shipment_status, num_packages} from SHIPMENT 
    // api/user-shipments : POST
    else if (path === "/api/user-shipments" && method === "POST") {
        try {
            // set the status code and content-type
            res.writeHead(201, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            const data = await getReqData(req);
            const user_email = JSON.parse(data);
            //console.log(user_email);

            const result = await new UserController().getUserShipmentsByEmail(user_email.email);


            res.end(JSON.stringify(result));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
        }
    }

    //TODO
    // api/update-status : POST
    else if (path === "/api/update-status" && method === "PUT")
    {
        try {
            // set the status code and content-type
            res.writeHead(201, { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });

            //TODO logic for modifying status here
            //receive '1' , '2' , '3', '4' to determine tracking status 
            // and update based on tracking_id

            res.end(JSON.stringify(result));
        } catch (error) {
            // set error status code and content-type
            res.writeHead(500, { "Content-Type": "application/json" });
            // send error
            res.end(JSON.stringify({ message: "" + error }));
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
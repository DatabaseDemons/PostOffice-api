//app.js
const http = require("http");
const User = require("./controller");
const { getReqData } = require ("./utils");
const { poolPromise } = require("./db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

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
        // get the users
        const users = await new User().getUsers();
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(users));
    }

    // /api/users/:id : GET
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get user
            const user = await new User().getUser(id);
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
            let message = await new User().deleteUser(id);
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
            let updated_user = await new User().updateUser(id);
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
        let user = await new User().createUser(JSON.parse(user_data));
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
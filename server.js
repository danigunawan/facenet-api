const http = require("http");
const app = require("./app");
const db = require("./db/db");

const port = process.env.PORT || 3000;

db.connect();

const server = http.createServer(app);
server.listen(port, () => {
  console.log("Server started on port 3000");

  console.log("\nRoutes available:\n-----------------\n");
  console.log("(POST) /api/student\n(GET)  /api/student\n");
  console.log(
    "(POST) /api/upload/image\n\n(GET)  /api/train\n\n(POST) /api/identify"
  );
});

/*
 * /api/upload/image
 * /api/upload/student
 */

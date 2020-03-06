const http = require("http");
const app = require("./app");
const db = require("./db/db");

const port = process.env.PORT || 3000;

db.connect();

const server = http.createServer(app);
server.listen(port, () => {
  console.log("Server started on port 3000");

  console.log("\nRoutes available:\n----------------\n");
  console.log("/api/upload/student\n/api/upload/image\n");
});

/*
 * /api/upload/image
 * /api/upload/student
 */

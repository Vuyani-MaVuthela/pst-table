const express = require("express");
const cors = require("cors");
require("dotenv").config();

const create = require("./routes/create");
const read = require("./routes/read");
const readAll = require("./routes/readAll");
const deleteRoute = require("./routes/delete");
const update = require("./routes/update");

const port = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.originalUrl} route received in middleware`);
  next();
});

app.post("/api/psl", create);
app.get("/api/psl", readAll);
app.get("/api/psl/:id", read);
app.delete("/api/psl/:id", deleteRoute);
app.put("/api/psl/:id", update);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

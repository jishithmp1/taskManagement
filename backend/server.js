const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes)

app.listen(3000, "0.0.0.0", () => console.log("server running on port 3000"));

const express = require("express");
const connectdb = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectdb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/addTaskRoute"));
//connecting the nodejs server
app.listen(5000, () => {
  console.log("app listening on port 5000");
});

/* This is the entry point of the application.
  It is the first file that is executed when the application starts.
*/

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

const app = require("./app");

app.listen(3000, () => console.log("Server is running on port 3000"));

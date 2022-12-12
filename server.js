const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/task-watcher");

const app = require("./app");

app.listen(3000, () => console.log("Server is running on port 3000"));

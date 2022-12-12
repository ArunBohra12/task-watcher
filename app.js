const path = require("node:path");
const http = require("node:http");

const express = require("express");
const cron = require("node-cron");

const Day = require("./models/dayModel");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const VIEWS_DIR = __dirname + "/views/html";

const FIELDS = ["sql", "javaScript", "reactJs", "dsa", "hackerRank", "project"];

/* Calculating the streak and rendering the index.ejs file with streak and days data. */
app.get("/", async (req, res) => {
  const days = await Day.find({}).sort({ date: -1 });

  const streak = days.reduce((acc, day, i) => {
    if (i === 0) {
      return acc;
    }

    let score = 0;
    for (const item in day) {
      if (day[item] === true && FIELDS.includes(item)) {
        score++;
      }
    }

    if (score === FIELDS.length) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  res.render(VIEWS_DIR + "/index.ejs", {
    data: days,
    streak: `${streak}/${days.length - 1}`,
  });
});

/* Creating a new day in the database. */
app.get("/create-day", async (req, res) => {
  try {
    const currentDate = new Date();
    const [date, month, year] = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()];
    const day = `${date}/${month + 1}/${year}`;

    await Day.create({ date: day });

    console.log("✅✅ SUCCESS");
    res.send("Created");
  } catch (error) {
    console.log("😓😓 Failed to create task");
    res.send("Failed to create task");
  }
});

/* Updating the day in the database. */
app.post("/update-day", async (req, res) => {
  try {
    const day = await Day.findOne({ date: req.body.date });

    const fieldsSetDone = {};

    for (const item in day) {
      if (day[item] === true && FIELDS.includes(item)) {
        fieldsSetDone[item] = true;
      }
    }

    const data = {
      ...req.body,
      ...fieldsSetDone,
    };

    await Day.findOneAndUpdate({ date: req.body.date }, data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Failed to update");
  }
});

// ------------------------------------------------------------
// CRON JOBS

/*  A cron job that is running every 10 seconds.
  It is making a request to the server to create a new day. */
cron.schedule("0 0 * * *", () => {
  console.log("😎😎 CRON JOB REQUEST");
  const cronRequest = http.get(`${req.protocol}://${req.hostname}:3000/create-day`);

  cronRequest.on("error", () => {
    console.log("Error occoured while performing cron job 🔥🔥");
  });
});

module.exports = app;

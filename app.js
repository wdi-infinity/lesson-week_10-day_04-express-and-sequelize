import express from "express";
import models from "./models";
import bodyParser from "body-parser";
import people from "./routes/people";
import articles from "./routes/articles";
import person_Articles from "./routes/person_Articles";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(people);
app.use(articles);
app.use(person_Articles);
// Routes ****

// Root path
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello WDI-Infinity!" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`express-api app listening on port ${PORT}`)
);

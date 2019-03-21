import express from "express";
import models from "./models";
import bodyParser from "body-parser";
import people from "./routes/people";
import articles from "./routes/articles";
import person_Articles from "./routes/person_Articles";
const app = express();
const port = 3000;

/*** MiddleWare ***/
app.use(bodyParser.json());
app.use(people);
app.use(articles);
app.use(person_Articles);
/*** Routes ***/

//Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello WDI-Infinity!" });
});

//http://localhost:3000/api/person/1/articles

models.sequelize.sync().then(() => {
  console.log("sync complete");

  // models.Article.create({
  //   title: "test",
  //   content: "this a test body",
  //   PersonId: 1
  // });
  app.listen(port, () =>
    console.log(`express-api app working on port ${port}`)
  );
});

import express from "express";
import bodyParser from "body-parser";
import people from "./people";
import articles from "./articles";

const router = express.Router();

/*** MiddleWare ***/
router.use(people);
router.use(articles);

//get all articles by person ID
router.get("/api/person/:id/articles", (req, res) => {
  models.Person.findByPk(req.params.id, {
    include: [{ model: models.Article }]
  }).then(person => {
    res.status(200).json({ person: person });
  });
});

export default router;

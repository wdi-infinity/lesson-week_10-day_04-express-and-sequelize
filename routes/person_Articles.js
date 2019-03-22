import express from "express";
import models from "../models";

const router = express.Router();

// Get ALL Articles by Person Record ID
router.get("/api/person/:id/articles", (req, res) => {
  const ID = req.params.id;
  models.Person.findByPk(ID, {
    include: [{ model: models.Article, as: "articles" }]
  })
    .then(person => {
      if (person.articles.length)
        res.status(200).json({ article: person.articles });
      else res.status(402).json({ message: "user have no articles" });
    })
    .catch(e => console.log(e));
});

export default router;

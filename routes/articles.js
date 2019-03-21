import express from "express";
import models from "../models";
import bodyParser from "body-parser";

const router = express.Router();

router.get("/api/articles", (req, res) => {
  models.Article.findAll()
    .then(articles => {
      res.status(200).json({ articles: articles });
    })
    .catch(e => console.log(e));
});

router.get("/api/article/:id", (req, res) => {
  if (isNaN(req.params.id) === false) {
    models.Article.findByPk(req.params.id)
      .then(article => {
        if (article === null) {
          res.status(200).json({ article: article });
        } else {
          res.status(404).json({ msg: "article is not found" });
        }
      })
      .catch(e => console.log(e));
  } else {
    res.status(406).json({ error: "Invalid ID" });
  }
});

export default router;

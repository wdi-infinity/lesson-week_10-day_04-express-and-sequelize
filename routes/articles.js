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

router.post("/api/article", (req, res) => {
  models.Article.create(req.body)
    .then(article => {
      res.status(201).json({ article: article });
    })
    .catch(e => console.log(e));
});
router.put("/api/article/:id", (req, res) => {
  models.Article.findByPk(req.params.id)
    .then(article => {
      article
        .update({
          title: req.body.title,
          content: req.body.content
        })
        .then(article => {
          res.status(200).json({ article: article });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

router.delete("/api/article/:id", (req, res) => {
  models.Article.findByPk(req.params.id)
    .then(article => {
      article.destroy().then(() => {
        res.status(200).json({
          result: `Record ID ${req.params.id} is deleted`
        });
      });
    })
    .catch(e => console.log(e));
});

export default router;

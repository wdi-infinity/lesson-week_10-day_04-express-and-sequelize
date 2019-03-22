import express from "express";
import models from "../models";

const router = express.Router();

// get all articles
router.get("/api/articles", (req, res) => {
  models.Article.findAll()
    .then(articles => {
      res.status(200).json({ articles: articles });
    })
    .catch(e => console.log(e));
});

// get one article
router.get("/api/article/:id", (req, res) => {
  const ID = req.params.id;
  models.Article.findByPk(ID)
    .then(article => {
      if (article) {
        res.status(200).json({ article: article });
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    })
    .catch(e => console.log(e));
});

// Delete a Article
router.delete("/api/article/:id", (req, res) => {
  const ID = req.params.id;
  models.Article.findByPk(ID).then(article => {
    if (article) {
      article
        .destroy()
        .then(() => {
          res.status(200).json({
            message: `${article.title} deleted successfully`
          });
        })
        .catch(e => console.log(e));
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  });
});

// Create a new Article
router.post("/api/articles", (req, res) => {
  models.Article.create(req.body)
    .then(articles => {
      res.status(200).json({ person: articles });
    })
    .catch(e => console.log(e));
});

// update an article
router.put("/api/article/:id", (req, res) => {
  const ID = req.params.id;
  models.Article.findByPk(ID).then(article => {
    if (article) {
      article
        .update({
          title: req.body.title,
          content: req.body.content
        })
        .then(() =>
          res
            .status(200)
            .json({ message: `${article.title} updated successfully` })
        )
        .catch(e => console.log(e));
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  });
});

export default router;

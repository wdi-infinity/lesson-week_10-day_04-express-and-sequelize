import express from "express";
import models from "../models";
import bodyParser from "body-parser";

const router = express.Router();

//get all articles by person ID
router.get("/api/person/:id/articles", (req, res) => {
  models.Person.findByPk(req.params.id, {
    include: [{ model: models.Article }]
  }).then(person => {
    res.status(200).json({ person: person });
  });
});

export default router;

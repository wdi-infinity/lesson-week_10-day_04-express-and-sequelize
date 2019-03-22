import express from 'express';
import bodyParser from 'body-parser';
import models from '../models';

  const router = express.Router();

  router.get('/api/people', (req, res) => {

    models.Person.findAll()
      .then((peopleFromDB) => {
        res.status(200).json({
          people: peopleFromDB,
        });
      })
      .catch(e => console.log(e));
  });

  router.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
      models.Person.findByPk(req.params.id)
  
        .then((person) => {
          if (person !== null) {
            res.status(200).json({ person });
          } else {
            res.status(416).json({ message: 'person not found' });
          }
        })
        .catch(e => console.log(e));
    } else {
      res.status(406).json({ error: 'onvilde ID' });
    }
  });

  
router.post('/api/person', (req, res) => {
  models.Person.create(req.body)
    .then((personNewFromDB) => {
      res.status(201).json({
        person: personNewFromDB,
      });
    })
    .catch(e => console.log(e));
});

router.delete('/api/person/:id', (req, res) => {
  models.Person.findByPk(req.params.id) // findByPk is find by praymary key 
  .then(person => {
    person.destroy().then(() => {
      res.status(200).json({
        result:`record ID ${req.params.id} Deleted`, success: true
      });
    })
  })
})


// Update an existing Person
http://localhost:3000/api/person/533
router.put('/api/person/:id', (req, res) => {
  // Find Person By ID sent to us by User in the URL
  models.Person.findByPk(req.params.id).then(person => {
    // Call the Update function on the Person the database sent us back.
    // Only update the fields I care about.
    person.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    })
    res.status(200).json({ person: person });
      // The database was able to update the user
      // And it sent us back an updated Record with the new information
      // We can now send back this new information to the user
      
   

  }).catch(e => console.log(e));
});

//=> http://localhost:3000/api/articles
router.get('/api/articles', (req, res) => {
  models.Article.findAll().then(oneArticles => {
  res.status(200).json({articles: oneArticles});
  }).catch(e => console.log(e))
  })

//=> http://localhost:3000/api/article/1  => show single article
router.get('/api/article/:id', (req, res) => {
  models.Article.findByPk(req.params.id).then(article => {
    res.status(200).json({article: article});
  })
});

// models.sequelize.sync().then(() =>    بداية الوظيفة المسؤولة عن اضافة المقالات
// {
//   console.log('sync com;list');


// models.Article.create({
//   title: 'test',
//   content: ' this is a body ',
//   PersonId:3
// });


//=> http://localhost:3000/api/person/1/articles  => show all articles in person
// get all articales by person recorde ID 

router.get('/api/person/:personID', (req, res) => {
  models.Article.findByPk(req.params.personID, {include:[{model: models.Article }]}).then(person => {
  res.status(200).json({ person: person});
  }).catch(e => console.log(e))
})

// Get ALL Articles by Person Record ID
router.get('/api/person/:id/articles', (req, res) => {
  models.Person.findByPk(req.params.id, { include: [{model: models.Article}] }).then(person => {
    res.status(200).json({ article: person });
  })
  .catch(e => console.log(e));
});

// });    التقفيلة حقتها المسؤولة عن اضافة المقالات

  
  export default router ;

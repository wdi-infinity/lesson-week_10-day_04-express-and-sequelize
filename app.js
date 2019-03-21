import express from 'express';
import bodyParser from 'body-parser';
import models from './models';
import { EROFS } from 'constants';

const app = express();
const port = 3000;

/** **  Middleware  *****/
app.use(bodyParser.json());

/****  routes  **** */

// Root Path
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello WDI-Infinity!',
  });
});

// Get All people
app.get('/api/people', (req, res) => {
  models.Person.findAll()
    .then((peopleFromDB) => {
      res.status(200).json({
        people: peopleFromDB,
      });
    })
    .catch(e => console.log(e));
});

// get person Record ID
app.get('/api/person/:id', (req, res) => {
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

app.post('/api/person', (req, res) => {
  models.Person.create(req.body)
    .then((personNewFromDB) => {
      res.status(201).json({
        person: personNewFromDB,
      });
    })
    .catch(e => console.log(e));
});


// app.delete('/api/person/:id', (req, res) => {
//   const id = req.params.id;
//     .then((personDeleteFromDB)=>{
//     people.splice(id, 1);
//   res.status(204).send();
// });
app.delete('/api/person/:id', (req, res) => {
  models.Person.findByPk(req.params.id) // findByPk is find by praymary key 
  .then(person => {
    person.destroy().then(() => {
      res.status(200).json({
        result:`record ID ${req.params.id} Deleted`, success: true
      });
    })
  })
})

//   people.splice(id, 1);
//   res.status(204).send();
//  });


// app.put('/api/person/:id', (req, res) => {
//   models.Person.findByPk(req.params.id).then(person => {
//     person.update( {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//     } ).then(person => {
//       res.status(200).json({person: person });
//     }).catch(e => console.error(e));
//   }).catch(e => console.error(e));
// })

// Update an existing Person
http://localhost:3000/api/person/533
app.put('/api/person/:id', (req, res) => {
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
app.get('/api/articles', (req, res) => {
  models.Article.findAll().then(oneArticles => {
  res.status(200).json({articles: oneArticles});
  }).catch(e => console.log(e))
  })

//=> http://localhost:3000/api/article/1  => show single article
app.get('/api/article/:id', (req, res) => {
  models.Article.findByPk(req.params.id).then(article => {
    res.status(200).json({article: article});
  })
});

models.sequelize.sync().then(() => 
{
  console.log('sync com;list');


models.Article.create({
  title: 'test',
  content: ' this is a nbody ',
  PersonId:1
});


//=> http://localhost:3000/api/person/1/articles  => show all articles in person
// get all articales by person recorde ID 

app.get('/api/person/:personID', (req, res) => {
  models.Article.findByPk(req.params.personID, {include:[{model: models.Article }]}).then(person => {
  res.status(200).json({ person: person});
  }).catch(e => console.log(e))
})

// Get ALL Articles by Person Record ID
app.get('/api/person/:id/articles', (req, res) => {
  models.Person.findByPk(req.params.id, { include: [{model: models.Article}] }).then(person => {
    res.status(200).json({ article: person });
  })
  .catch(e => console.log(e));
});

});


// app.get('/api/persons', (req, res) => {
//   models.Person.findByPk().then(person => {
//   res.status(200).json({person: person, );
//   }).catch(e => console.log(e))
//   })


app.listen(port, () => {
  console.log(`.:|:|:|:|:|express-api app Server started on ${port}|:|:|:|:.`);
  console.error()
})




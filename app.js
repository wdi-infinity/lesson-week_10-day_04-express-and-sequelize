import express from 'express';
import models from './models';
import bodyParser from 'body-parser';


const app = express();
// localhost:3000
const port = 3000;

// Midle ware
app.use(bodyParser.json());



//Rout path
app.get('/', (req,res) => {
 res.status(200).json({
 message: 'Hello WDI-infinty'
 });
});



// const people = [
//     {firstName: 'Abdullah', lastName:'Adel'},
//     {firstName: 'Ali', lastName:'Adel'},
//     {firstName: 'Micheal', lastName:'Fimann'}
// ];

//Rout get all people
app.get('/api/people', (req,res) => {
    models.Person.findAll()
    .then(people => {
        res.status(200).json({ people: people });
      })
      .catch(e => console.log(e));
    });


 //Rout get person by id
    app.get('/api/person/:id', (req, res) => {
         if( !isNaN(req.params.id)){
                models.Person.findByPk(req.params.id).then(person => {
                    if(person !== null){
                    res.status(200).json({ person: person });
                    } else {
                        res.status(404).json({ error: 'Person Not Found' }); 
                    }
                })
                .catch(e => console.log(e));
    } else {
        res.status(406).json({error: 'Invalid ID'})
    }
      });

// create new person 
app.post('/api/person', (req,res) => {
    models.Person.create(req.body)
    .then(personnewformdb => {
        res.status(201).json({ person: personnewformdb});
    })
    .catch(e => console.log(e));
});





// update the person 
app.put('/api/person/:id', (req,res) => {
    models.Person.update({
        first_name: req.body,
        last_name: req.body
    })
},
{
  where: {
    id: req.params.id
  }
}).then( (result) => res.json(result) )


// delete the person 
app.delete('/api/person/:id', (req, res) => {
    models.Person.destroy({
        where: { person: req.params.id}
    })
    .then(handleEntityNotFound(res))
    .then(() => {
      res.status(204).end();
    })
    .catch(handleError(res));
}
)
.then(person => {
        res.status(200).json({ person: person });
  })
    .catch(e => console.log(e));


// app.delete('/api/person/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
  
    
//          models.Person.update(index, 1);
//          return res.status(200).send({
//            success: 'true',
//            message: 'posts deleted successfuly',
//          });
//       }
//     });
  
  
//       return res.status(404).send({
//         success: 'false',
//         message: 'todo not found',
//       });
  
   
//   });


  






app.listen(port, () => console.log(`express-api app listening on port ${port}`));
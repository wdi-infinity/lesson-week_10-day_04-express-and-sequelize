import express from 'express';
import models from './models'
import bodyParser from 'body-parser';
import peopleRoute from './routes/peopleRoute'
import articlesRoute from './routes/articlesRoute'

const app = express();
const port = 3000;

/*** MiddleWare ***/
app.use(peopleRoute);
app.use(articlesRoute);
app.use(bodyParser.json());



/*** Routes ***/

//localhost:3000
app.get('/',(req , res) => {
res.status(200).json({ message: 'Hello WDI-Infinty!' })
});



  
 

    //localhost:3000/api/person/:id/articles display all articles which belongs to this person
    app.get('/api/person/:id/articles' , (req, res) =>{
       const  id = req.params.id
       models.Person.findByPk(id , 
        {include: 
            [{model: models.Article}]
        }
        )
       .then( person =>{
        res.status(200).json({person: person})
       })
       .catch( e => console.log(e))
    

    })

    models.sequelize.sync().then(() => {
        console.log("sync completed");

        // models.Article.create({
        //     title: 'test',
        //     content: 'Person 33',
        //     PersonId: 3

        // })
        app.listen(port, ()=> console.log(`express-api listening on port ${port}`));
    })

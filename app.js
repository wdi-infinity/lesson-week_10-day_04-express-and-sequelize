import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'
import articlesRout from './routes/articlesRoute'

const app = express();
const port = 3000;


// Middleware 
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articlesRout);

//  routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello ppl !"
    });
});



// localhost:3000/api/article/1/comments


// sync function / my web app should not run sync --> I dont want to listen to user until my app is synced to DB 
models.sequelize.sync({}).then(() => {
    console.log("SYNC COMPLETE ")
    // models.Article.create({
    //     title: "test2",
    //     content: "this is a body2",
    //     PersonId: 1
    // });
    app.listen(port, () => console.log(`express-api listening on port ${port}`))

})
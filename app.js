import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articleRouter from './routes/articleRoutes';

const PORT = 3000;
const app = express();


///middleware////

app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articleRouter);


///route path ///
app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})

models.sequelize.sync()
.then(()=> {
    console.log('sync complete');
app.listen(PORT, () => {
  console.log("server running on port"+PORT)
})
});
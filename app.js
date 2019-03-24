import express from 'express';
import bodyParser from 'body-parser'
import peopleRouter from './routes/peopleRoutes';
import articlesRouter from './routes/articlesRoutes';

const app = express();
const port = 3000

// Middleware
app.use(bodyParser.json())
app.use(peopleRouter);
app.use(articlesRouter);
/***  Routes ***/

// Route path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})

app.listen(port, () => console.log(`express-api listening on port ${port}!`))
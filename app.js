import express from 'express';
//declear bath route
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });


});

app.listen(3000, () => console.log(`express-api app listening on port 3000!${port}!`))

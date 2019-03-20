import express from 'express';

const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.status(200).json({
        message:'Hello WDI-Unfinity!'
    });
});


app.listen(3000, () => console.log(`express-api app listing on port ${port}!`));
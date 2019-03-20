import express from 'express';
import { log } from 'util';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello WDI-Infinity!"
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`express-api app listening on port ${PORT}`)
)
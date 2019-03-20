import express from 'express';
import { RSA_NO_PADDING } from 'constants';
const app = express();
const port = 3000;

app.get('/', (req, res) => {

    res.status(200).json({

        message: 'Hello WDI-Infinity!'
    });


});
app.listen(port, () => console.log(`express-api app listninig on port ${port}!`));
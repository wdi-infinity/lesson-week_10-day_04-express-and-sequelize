import express from 'express';

const app = express();

const port = 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from WDI 3'
    });
});

app.listen(port, () => console.log(`express-api app listen to port 3000 ${port}`))
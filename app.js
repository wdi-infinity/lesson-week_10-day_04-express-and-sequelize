import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})

app.listen(3000, () => console.log('express-api listening on port 3000!'))
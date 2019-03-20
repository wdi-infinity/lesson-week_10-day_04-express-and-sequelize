import express from 'express';

const app = express();

app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})


const PORT = 3000;

app.listen(PORT, () => {
  console.log("server running on port"+PORT)
});
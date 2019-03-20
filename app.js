import express from 'express';
const app = express();
const port = 3000
const people = [
    { firstName: "Hala", lastName: "Almaimoni" },
    { firstName: "hessa", lastName: "Alaqeel" },
    { firstName: "sara", lastName: "alyahya" },
    { firstName: "abdullah", lastName: "alfehaid" },
]

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})
app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    })
})

app.listen(port, () => console.log(`express-api listening on port ${port}!`))
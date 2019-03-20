import express from 'express';
//declear bath route
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });

    const peopleList = [
        { firstName: 'Nahed', lastName: "Hawsawi" },
        { firstName: 'Jone', lastName: "Jak" },
        { firstName: 'Nahed', lastName: "Hawsawi" },
        { firstName: 'jamal', lastName: "hamed" },
        { firstName: 'jaswer', lastName: "nawras" }

    ]

    app.get('/api/people', (req, res) => {
        res.status(200).json({
            people: people
        });
    });


});

app.listen(3000, () => console.log(`express-api app listening on port 3000!${port}!`))

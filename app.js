import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {

    res.status(200).json({

        message: 'Hello WDI-Infinity!'
    });


});
const peopleList = [
    { firstName: 'Saja', lastName: 'ALi' },
    { firstName: 'Anfal', lastName: 'jafrai' },
    { firstName: 'Ghadeer', lastName: 'ALkhathlan' },
    { firstName: 'Me', lastName: 'Me' },
    { firstName: 'Usman', lastName: 'Bashir' },


];
app.get('/api/people', (req, res) => {
    res.status(200).json({

        people: peopleList

    });



});
//localhost:3000
//localhost:3000/api/people

app.listen(port, () => console.log(`express-api app listninig on port ${port}!`));
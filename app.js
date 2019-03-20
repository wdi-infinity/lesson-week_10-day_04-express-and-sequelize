import express from 'express';

const app =  express();
const port = 3000;

app.get('/',(req,res)=> {
res.status(200).json({
    message:'Hello WDI-Infinity!'
});
});

const peopleList = [
    { firstName: 'mohmamag' ,lastName:'omar'},
    { firstName: 'ali' ,lastName:'narul'},
    { firstName: 'ganduf' ,lastName:'omar'},
    { firstName: 'mohmamag' ,lastName:'omar'},
    { firstName: 'ali' ,lastName:'narul'},
    { firstName: 'ganduf' ,lastName:'omar'},
    { firstName: 'mohmamag' ,lastName:'omar'},
    { firstName: 'ali' ,lastName:'narul'},
    { firstName: 'ganduf' ,lastName:'omar'}
]

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: peopleList
       } );
});

app.listen(port, () => {
    console.log(`.:|:|:|:|:|express-api app Server started on ${port}|:|:|:|:.`);
});

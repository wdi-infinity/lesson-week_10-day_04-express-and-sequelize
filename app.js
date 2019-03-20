import express from 'express';

const app = express();

app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})

const peopleList =[
    {firstName: 'Asma', lastName: 'Quraishi'},
    {firstName: 'sara', lastName: 'ahmad'},
    {firstName: 'badriah', lastName: 'shehri'},
    {firstName: 'usman', lastName: 'bashir'},
    {firstName: 'reem', lastName: 'fahad'}
];

app.get('/api/people',(req,res)=>{
    res.status(200).json({
        people: peopleList
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server running on port"+PORT)
});
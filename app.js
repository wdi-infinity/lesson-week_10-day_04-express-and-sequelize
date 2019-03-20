import express from 'express';

const app = express();
const port = 3000;
//localhost:3000
app.get('/',(req , res) => {
res.status(200).json({
    message: 'Hello WDI-Infinty!'
})
});
const people = [
    {first_name: 'abdulmohsin' , last_name: 'sharhan'},
    {first_name: 'Ahmed' , last_name: 'alqhtani'},
    {first_name: 'Saud' , last_name: 'almutari'},
    {first_name: 'Moath' , last_name: 'althwid'}
]
//localhost:3000/api/people
app.get('/api/people' , (req , res ) => {
    res.status(200).json({
       people
    })
})
app.listen(port, ()=> console.log(`express-api listening on port ${port}`));
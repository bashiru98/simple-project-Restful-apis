const Joi =require('joi');

const express =require('express');

const app = express();
app.use(express.json());

const genres = [
    { id: 1, name: 'Horror'},
    { id: 2, name: 'Action'},
    { id: 3, name: 'nigerian movies'},
    { id: 4, name: 'fast and farious'},
    { id: 5, name: 'Documentary'},
    { id: 6, name: 'Ghanaian movies'},
    { id: 7, name: 'Romantic movies'},

];

app.get('/api/genres', (req, res) => {
    res.send(genres);
    
});

app.post('/api/genres', (req, res) => {
    const {error} = validateGenres(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const movie = {
        id: genres.length +1,
        name: req.body.name,
    };
    genres.push(movie);
    res.send(movie);
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('course with the given ID can not be found');
    res.send(genre);

});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('course with the given ID can not be found');
    res.send(genre);

    const {error} = validateGenres(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);


});

app.delete('/api/genres/:id', (req, res) => {

 const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('course with the given ID can not be found');
    res.send(genre);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);

});



function validateGenres (genre) {
    const schema = {
        name:Joi.string().min(5).required()
    };
    return Joi.validate(genre, schema);

}



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
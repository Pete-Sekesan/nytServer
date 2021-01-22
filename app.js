const express = require('express'); 
const morgan = require('morgan');
const app = express();
const books = require('./books');

app.use(morgan('common'));

app.get('/books', (req, res) => {
    const { search = '', sort } = req.query;
    if (sort) {
        if (!['title', 'rank'].includes(sort)) {
            return res.status(400).send("Sort must be either title or rank")
        }
    }



    let results = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase().trim()));

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        })
    }


    res.json(results);
})

app.listen(8000, () => {
    console.log('NYT App is running on port http://localhost:8000')
})


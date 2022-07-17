const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');
const cors = require("cors");

const app = express();
const port = process.env.port || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(cors());
app.use(express.static(publicDirPath));

app.get('', (req, res)=>{
    if(req.query.name && req.query.year){
        return res.render('index', {
            name: req.query.name,
            year: req.query.year
        });
    }
    res.render('index', {
        name: 'John Carter',
        year: 2001
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'This is about page',
        year: 2022
    });
});

app.get('/data', async (req, res)=>{
    const json = await fetch(`https://jsonplaceholder.typicode.com/${req.query.type}/${req.query.id}`).then(res=>res.json());
    res.send(json);
});

app.get('*', (req, res)=>{
    res.render('404', {
        errorMsg: `${req.url} is not found`
    })
});

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});
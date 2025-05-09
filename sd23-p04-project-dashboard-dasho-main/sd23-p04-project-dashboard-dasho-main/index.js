import express from 'express';
import fs from 'node:fs';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/bitcoin1w', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('json/bitcoin1w.json', function(err, data){
        res.send(data);
    });
});

app.get('/bitcoin1m', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('json/bitcoin1m.json', function(err, data){
        res.send(data);
    });
});

app.get('/bitcoin1y', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('json/bitcoin1y.json', function(err, data){
        res.send(data);
    });
});

app.get('/bitcoin3y', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('json/bitcoin3m.json', function(err, data){
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
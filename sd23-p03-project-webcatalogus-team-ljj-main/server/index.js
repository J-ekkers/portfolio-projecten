import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
const app = express();
const port = 3000;
 
app.use(cors());
 
app.get('/acti-games', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/activision.json', function (err, data) {
        res.send(data);
    })
});
 
app.get('/ubi-games', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/ubisoft.json', function (err, pdata) {
        res.send(pdata);
    })
});
 
app.get('/rock-games', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/rockstar.json', function (err, drdata) {
        res.send(drdata);
    })
});
 
app.get('/pop', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/pop.json', function (err, data) {
        res.send(data);
    })
});
 
app.get('/rock', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/rock.json', function (err, pdata) {
        res.send(pdata);
    })
});
 
app.get('/hiphop', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/hiphop.json', function (err, drdata) {
        res.send(drdata);
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
 
});
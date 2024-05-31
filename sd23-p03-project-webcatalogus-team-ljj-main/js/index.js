import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
const app = express();
const port = 3000;
 
app.use(cors());
 
app.get('/ubigames', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/ubigames.json', function (err, data) {
        res.send(data);
    })
});
 
app.get('/rockgames', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/rockgames.json', function (err, pdata) {
        res.send(pdata);
    })
});
 
 
 
app.get('actgames', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/actgames.json', function (err, drdata) {
        res.send(drdata);
    })
});
 

 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
 
});
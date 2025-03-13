//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Read comments from file
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

//Write comments to file
app.post('/comments', (req, res) => {
    console.log(req.body);
    fs.writeFile('./comments.json', JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send('Error writing file');
        } else {
            res.send('File saved');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());



app.get('/api/signin', (req, res) => {
let users = {
    'youssef.lazzouzi@etu.uae.ac.ma' : {
        firstName: 'Youssef',
        lastName: 'Lazzouzi',
        email: "youssef.lazzouzi@etu.uae.ac.ma",
        password: "password123"
    },
    };
    res.send(users || null);
    



});

const port = 3001;

app.listen(port, () => console.log(`API Server listening on port ${port}`));

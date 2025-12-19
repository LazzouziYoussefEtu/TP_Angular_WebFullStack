const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = {
    'youssef.lazzouzi@etu.uae.ac.ma': {
        firstName: 'Youssef',
        lastName: 'Lazzouzi',
        email: 'youssef.lazzouzi@etu.uae.ac.ma',
        password: 'password123'
    },
    'test@test.com': {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'password'
    }
};

const products = [
    { id: 1, name: 'Product 1', price: 100, image: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: 200, image: 'image2.jpg' },
];

app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users[email];
    if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        res.status(200).send(userWithoutPassword);
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.send(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.get('/api/users', (req, res) => {
    const usersWithoutPasswords = Object.values(users).map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    res.send(usersWithoutPasswords);
});

app.get('/api/users/:email', (req, res) => {
    const user = users[req.params.email];
    if (user) {
        const { password, ...userWithoutPassword } = user;
        res.send(userWithoutPassword);
    } else {
        res.status(404).send('User not found');
    }
});


const port = 3001;

app.listen(port, () => console.log(`API Server listening on port ${port}`));

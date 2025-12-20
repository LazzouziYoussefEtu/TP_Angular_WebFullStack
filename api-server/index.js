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
        email: "youssef.lazzouzi@etu.uae.ac.ma",
        password: "password123"
    }
};

app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users[email];

    if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            message: "Connexion réussie",
            user: userWithoutPassword
        });
    } else {
        res.status(401).json({ 
            message: "Email ou mot de passe incorrect" 
        });
    }
});
const port = 3001;

app.listen(port, () => console.log(`API Server listening on port ${port}`));

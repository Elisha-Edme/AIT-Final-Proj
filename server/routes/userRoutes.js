const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
const sanitize = require('mongo-sanitize');
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({name: req.name});
        if (user) {
            res.status(200).json(user);
            console.log(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.post('/register', async (req, res) => {
    let {name, password} = req.body;
    name = sanitize(name);
    password = sanitize(password);
    // if a user is already in the db with that username
    const user = await User.findOne({name: name});
    if (user) {
        res.status(500).json({ message: 'TRY AGAIN LIL NIGGA' });
    }
    else {
        const newUser = new User({ name, password });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    }
});

router.get('/register', (req, res) => res.status(200).json({message: "shit works ong"}))
module.exports = router;
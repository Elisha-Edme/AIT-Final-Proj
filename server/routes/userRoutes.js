const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Code From NetNinja (taught how to use JWT)
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

router.post('/login', async (req, res) => {
    let {name, password} = req.body
    name = sanitize(name);
    password = sanitize(password);
    const user = await User.findOne({name: name});
    if (user && await bcrypt.compare(password, user.password)) {
        const token = createToken(user._id);
        res.status(200).json({token, name, id:user._id});
        console.log(user);
    } else {
        res.status(201).json({ message: 'User not found!', name:name, password:password });
    }
})

router.post('/register', async (req, res) => {
    let {name, password} = req.body;
    name = sanitize(name);
    password = sanitize(password);
    // if a user is already in the db with that username
    const user = await User.findOne({name: name});
    if (user) {
        res.status(201).json({ message: `${name} is already a user. Please use a different name` });
    }
    else {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name:name, password: hash, purchases:[] });
        // Save the user to the database
        const token = createToken(newUser._id);

        res.status(200).json({name, token});
    }
});

// router.get('/register', (req, res) => res.status(200).json({message: "shit works ong"}))
module.exports = router;
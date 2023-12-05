const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};
router.post('/login', async (req, res) => {
    let {name, password} = req.body
    name = sanitize(name);
    password = sanitize(password);

    const user = await User.findOne({name: name});
    // res.status(200).json(user);
    if (user && user.comparePassword(password)) {
        res.status(200).json({message:'Success'});
        console.log(user);
    } else {
        res.status(201).json({ message: 'User not found!', name:name, password:password });
    }
})

router.post('/register', async (req, res) => {
    let {name, password} = req.body;
    name = sanitize(name.toUpperCase());
    password = sanitize(password);
    // if a user is already in the db with that username
    const user = await User.findOne({name: name});
    if (user) {
        res.status(201).json({ message: `"${name}" is already a user. Please use a different name` });
    }
    else {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({ name, password: hash });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    }
});

// router.get('/register', (req, res) => res.status(200).json({message: "shit works ong"}))
module.exports = router;
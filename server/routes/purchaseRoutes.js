const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/user/:uid', async (req, res) => {
    const user = await User.findById(req.params.uid);
    if (user) {
        console.log(user);
        res.status(200).json({purchases: user.purchases, name:user.name, keys:Object.keys(user)});
    } else {
        res.status(404).json({ message: 'User not found!'});
    }
})

router.get('/:pid', async (req, res) => {
    const user = await Purchase.findById({_id: req.params.pid});
    if (user) {
        console.log(user);
        res.status(200).json(user);
        console.log(user);
    } else {
        res.status(404).json({ message: 'Purchase not found!'});
    }
})
// router.post('/register', async (req, res) => {
//     let {name, password} = req.body;
//     name = sanitize(name);
//     password = sanitize(password);
//     // if a user is already in the db with that username
//     const user = await User.findOne({name: name});
//     if (user) {
//         res.status(201).json({ message: `${name} is already a user. Please use a different name` });
//     }
//     else {
//         const salt = await bcrypt.genSalt();
//         const hash = await bcrypt.hash(password, salt);
//         const newUser = await User.create({ name:name, password: hash });
//         // Save the user to the database
//         const token = createToken(newUser._id);

//         res.status(200).json({name, token});
//     }
// });

// router.get('/register', (req, res) => res.status(200).json({message: "shit works ong"}))
module.exports = router;
const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
router.get('/user/:uid', async (req, res) => {
    let user = await User.findById(req.params.uid);
    if (user) {
        const lst = [];
        const getDetails = async (ind) => {
            if (ind < user['purchases'].length) {
                console.log('lst', lst);
                const pid = user['purchases'][ind];
                console.log('pi', pid);
                const api_url = "https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/"
                //const api_url = "http://localhost:8080/api/purchases/"
                await axios.get(`${api_url}${pid}`).then(async details => {
                    console.log(details.data);
                    lst.push(details.data);
                    console.log('lst2', lst);
                    await getDetails(ind + 1);
                }).catch(console.log);
            }
        }
        await getDetails(0).then( async (response) => {
            await res.status(200).json({"purchases":lst, name:user['name']});
            console.log(lst);
        });
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
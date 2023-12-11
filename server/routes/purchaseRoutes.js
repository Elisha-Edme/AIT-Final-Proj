const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const mongoose = require('mongoose')
router.get('/user/:uid', async (req, res) => {
    let user = await User.findById(req.params.uid);
    if (user) {
        const lst = [];
        const getDetails = async (ind) => {
            if (ind < user['purchases'].length) {
                const pid = user['purchases'][ind];
                const api_url = "https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/"
                await axios.get(`${api_url}${pid}`).then(async details => {
                    lst.push(details.data);
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
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Purchase not found!'});
    }
})

router.post('/addPurchase/:_id', async (req, res) => {
    try {
        const userId = req.params._id;
        // Check if userId is defined and is a valid ObjectId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findOne({ _id: userId });
        if (user) {
            const purch = await Purchase.create({ ...req.body });

            // Assuming you have validations or required fields in your Purchase schema,
            // you might want to check if the creation of Purchase was successful.
            if (purch) {
                user.purchases.push(purch._id);
                await user.save();
                res.status(200).json({ user, purch });
            } else {
                res.status(501).json({ message: "Invalid data for Purchase" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
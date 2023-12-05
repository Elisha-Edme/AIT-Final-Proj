const router = require('express').Router();
const User = require('../models/userModel')
const Purchase = require('../models/purchaseModel')
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.username});
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

module.exports = router;
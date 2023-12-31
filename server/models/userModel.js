const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    purchases: {
        type: Array
    }
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;

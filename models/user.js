const { required } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose") //it will add hash, salt and username field automatically to the user schema

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
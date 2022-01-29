const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    restaurantName: { type: String, required: true }, 
    restaurantOwner: String,
    restaurantEmail: { type: String, required: true, unique: true }, 
    restaurantPsw: String,
    restaurantConfirmed: Boolean,
    restaurantMenu: Array,
    restaurantNumber: Number,
    restaurantAddress: String,
    restaurantDescription: String,
    resetToken: String,
    confirmToken: String,
    resetTokenExpires: Date,
    confirmTokenExpires: Date
});

restaurantSchema.methods.generateConfirmToken = function() {
    this.confirmToken = crypto.randomBytes(10).toString('hex');
    this.confirmTokenExpires = Date.now() + (1000 * 60 * 15);
};

restaurantSchema.methods.generateResetToken = function() {
    this.resetToken = crypto.randomBytes(20).toString('hex');
    this.resetTokenExpires = Date.now() + (1000 * 60 * 15); //expires in an 15 min
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  isAdmin: { type: Boolean, default: false }
});

// Static method to create a new user
userSchema.statics.newUser = function (userData) {
  const newUser = new this(userData);
  return newUser.save();
};

// Instance method to change the user's name
userSchema.methods.changeName = function (newName) {
  this.name = newName;
  return this.save();
};

// Instance method to change the user's email
userSchema.methods.changeEmail = function (newEmail) {
  this.email = newEmail;
  return this.save();
};

// Instance method to change the user's password
userSchema.methods.changePassword = function (newPassword) {
  this.password = newPassword;
  return this.save();
};

// Instance method to change the user's address
userSchema.methods.changeAddress = function (newAddress) {
  this.address = newAddress;
  return this.save();
};

// Instance method to remove an order from the user's order history
userSchema.methods.removeOrder = function (orderId) {
  this.orderHistory.pull(orderId);
  return this.save();
};

// Instance method to add an order to the user's order history
userSchema.methods.addOrder = function (orderId) {
  this.orderHistory.push(orderId);
  return this.save();
};

// Instance method to change the isAdmin status of the user
userSchema.methods.changeIsAdmin = function (isAdmin) {
  this.isAdmin = isAdmin;
  return this.save();
};

// Instance method to retrieve the user's order history
userSchema.methods.getOrderHistory = function () {
  return this.model('Order').find({ _id: { $in: this.orderHistory } });
};

// Instance method to get the total number of orders in the user's order history
userSchema.methods.getTotalOrders = function () {
  return this.orderHistory.length;
};

// Instance method to check if the user is an admin user
userSchema.methods.isAdminUser = function () {
  return this.isAdmin;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

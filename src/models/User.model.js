const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    trim: true,
    minLength: 4
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true,
    validate: { validator: isValidEmail, message: 'Invalid email address' } 
  },
  password: {
    type: String, 
    required: true,
    trim: true,
    minLength: 6,
  },
  address: { 
    type: String, 
    required: true,
    trim: true,
    minLength: 6
  },
  orderHistory: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order' 
    }
  ],
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
},{
  timestamps: true
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//Function for creating a token with the jwt secret and adding it to ther user's tokens array in the db
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET.toString()); // {expiresIn: '1h'}

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}


// Check Email's validity
function isValidEmail(email) {
  return validator.isEmail(email);
}


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

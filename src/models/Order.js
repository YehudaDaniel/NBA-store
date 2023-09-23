const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
});

// Static method to create a new order
orderSchema.statics.newOrder = function (orderData) {
  const newOrder = new this(orderData);
  return newOrder.save();
};

// Instance method to retrieve the user associated with the order
orderSchema.methods.getUser = function () {
  return this.model('User').findById(this.user);
};

// Instance method to add a product to the order
orderSchema.methods.addProduct = function (productId) {
  this.products.push(productId);
  return this.calculateTotalPrice().then(() => this.save());
};
  
// Instance method to recalculate the total price based on the products in the order
orderSchema.methods.calculateTotalPrice = function () {
  const Product = mongoose.model('Product');
  return Product.find({ _id: { $in: this.products } })
    .then(products => {
      let totalPrice = 0;
      products.forEach(product => {
        totalPrice += product.price;
      });
      this.totalPrice = totalPrice;
    })
    .catch(error => {
      throw new Error('Failed to calculate total price: ' + error);
    });
};

// Instance method to remove a product from the order
orderSchema.methods.removeProduct = function (productId) {
  this.products.pull(productId);
  return this.save();
};

// Instance method to retrieve the list of products in the order
orderSchema.methods.getProducts = function () {
  return this.model('Product').find({ _id: { $in: this.products } });
};

// Instance method to retrieve the total price of the order
orderSchema.methods.getTotalPrice = function () {
  return this.totalPrice;
};

// Instance method to update the order's status
orderSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  return this.save();
};

// Instance method to delete the order
orderSchema.methods.deleteOrder = function () {
  return this.remove();
};

// Instance method to retrieve the status of the order
orderSchema.methods.getStatus = function () {
  return this.status;
};

// Instance method to finish the order and add it to the user's order history
orderSchema.methods.finishOrder = function () {
  const User = mongoose.model('User');
  
  // Add the order to the user's order history
  return User.findById(this.user)
    .then(user => {
      user.addOrder(this._id);
      return user.save();
    })
    .catch(error => {
      throw new Error('Failed to finish order: ' + error);
    });
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

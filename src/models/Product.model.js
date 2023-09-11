const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: false,
    default: "NBA Team"
  },
  image: { 
    type: String 
  }
});

// Static method to create a new product
productSchema.statics.newProduct = function (productData) {
  const newProduct = new this(productData);
  return newProduct.save();
};

// Instance method to change the product's name
productSchema.methods.changeName = function (newName) {
  this.name = newName;
  return this.save();
};

// Instance method to change the product's price
productSchema.methods.changePrice = function (newPrice) {
  this.price = newPrice;
  return this.save();
};

// Instance method to change the product's description
productSchema.methods.changeDescription = function (newDescription) {
  this.description = newDescription;
  return this.save();
};

// Instance method to add a category to the product
productSchema.methods.addCategory = function (newCategory) {
  this.category.push(newCategory);
  return this.save();
};

// Instance method to remove a category from the product
productSchema.methods.removeCategory = function (category) {
  this.category.pull(category);
  return this.save();
};

// Instance method to change the product's image
productSchema.methods.changeImage = function (newImage) {
  this.image = newImage;
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

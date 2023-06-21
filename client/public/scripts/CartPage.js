document.addEventListener("DOMContentLoaded", function () {
    updateTotalPrice();
  });
  
  function incrementQuantity(button) {
    var quantityElement = button.parentNode.querySelector(".quantity-value");
    var quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
    updateTotalPrice();
  }
  
  function decrementQuantity(button) {
    var quantityElement = button.parentNode.querySelector(".quantity-value");
    var quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
      updateTotalPrice();
    }
  }
  
  function updateTotalPrice() {
    var itemPrices = document.querySelectorAll(".item .price");
    var quantityValues = document.querySelectorAll(".item .quantity-value");
    var totalPrice = 0;
  
    for (var i = 0; i < itemPrices.length; i++) {
      var price = parseFloat(itemPrices[i].textContent.substring(1));
      var quantity = parseInt(quantityValues[i].textContent);
      totalPrice += price * quantity;
    }
  
    document.getElementById("total-price").textContent = "$" + totalPrice.toFixed(2);
  }
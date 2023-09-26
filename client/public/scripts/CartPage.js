//saving the cookie token
let token = document.cookie.split(';').map(cookie => cookie.trim()).find(item => item.split('=')[0] == 'token').split('=')[1];


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
  var quantityValues = document.querySelectorAll(".item .quantity-label");
  var totalPrice = 0;

  for (var i = 0; i < itemPrices.length; i++) {
    var price = parseFloat(itemPrices[i].textContent.slice(0, -1));
    var quantity = parseInt(quantityValues[i].textContent.split(" ")[1]);
    totalPrice += price * quantity;
  }

  document.getElementById("total-price").textContent = totalPrice.toFixed(2) + "$";

  document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', () => {
      var item = button.parentNode.parentNode.parentNode;
      item.parentNode.removeChild(item);
      const productid = item.getAttribute('data-productid');
      const cart = JSON.parse(getCookie('cart'));
      const newCart = cart.filter(item => item.productId !== productid);
      setCookie('cart', JSON.stringify(newCart));
      updateTotalPrice();
    });
  });
}

const finish = document.querySelector('.payment-button');
finish.addEventListener('click', async (e) => {
  e.preventDefault();
  const cart = JSON.parse(getCookie('cart'));
  const products = await sendOrder(cart)
    .then(res => { 
      window.location = '/thankyou'
    });
});




//Helper functions

function sendOrder(cart){
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: '/user/order',
      data: {user: JSON.parse(sessionStorage.getItem('user')), products: cart, totalPrice: document.getElementById("total-price").textContent.slice(0, -1)},
      async: true,
      headers: {
        "Authorization": "Bearer " + JSON.parse(token)
      },
      success: function (res) {
        resolve(res);
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

function getCookie(name) {
  const cookieName = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
  return null;
}

function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
const addBtn = document.querySelector('#addToCart-button');

addBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    const urlArr = currentUrl.split('/');
    //Product Id
    const productId = urlArr[urlArr.length - 1];
    const amount = document.querySelector('#amount').value;
    const size = document.querySelector('#size').value;
    // const price = document.querySelector('#price').innerHTML.slice(0, -1);

    if (!getCookie('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }

    const item = {
        productId,
        amount,
        size
    }
    addToCart(item);
});

function addToCart(item) {
    // Check if the cart cookie exists
    let cartData = JSON.parse(getCookie('cart')) || [];

    // Add the item to the cart
    cartData.push(item);

    // Set the cart cookie with updated data
    setCookie('cart', JSON.stringify(cartData));
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
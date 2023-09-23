

$(document).ready(function () {

    //Sending a GET request to retrieve all the relevant products
    let token = document.cookie.split(';').map(cookie => cookie.trim()).find(item => item.split('=')[0] == 'token').split('=')[1];

    $.ajax({
        type: 'POST',
        url: '/product/products',
        async: true,
        data: { type: document.body.getAttribute('data-page') },
        success: function (res) {
            document.querySelector('.preloader').style.display = 'none';

            for (let i = 0; i < res.length; i++) {
                // Convert ArrayBuffer to a Uint8Array
                const uint8Array = new Uint8Array(res[i].image.data);

                // Convert Uint8Array to a binary string
                let binaryString = '';
                uint8Array.forEach(byte => {
                    binaryString += String.fromCharCode(byte);
                });
                // Encode the binary string to Base64
                const base64String = btoa(binaryString);
                const sizes = res[i].size.join(', ');

                const newProduct = $(`
                <div class="product">
                    <div class="img">
                        <img src="data:image/jpg;base64,${base64String}" alt="${res[i].name}" />
                    </div>
                    <div class="product-details">
                        <div class="details-text">
                            <span class="name">${res[i].name}</span>
                            <span class="amt">Price: ${res[i].price}$</span>
                            <span class="size">Size: ${sizes}</span>
                            <span class="color">color: ${res[i].color}</span>
                            <span class="color">team: ${res[i].team}</span>
                        </div>
                        <div class="details-btns">
                            <div class="addWrapper">
                                <span class="addWrapper-minus">-</span>
                                <span class="addWrapper-num">0</span>
                                <span class="addWrapper-plus">+</span>
                            </div>
                            <button class="heart-btn">
                                <div class="content">
                                    <span class="heart"></span>
                                    <span class="numb"></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                `)
                $('.products').append(newProduct);
            }


            //scripts for the plus minus buttons
            let count = 0;

            Array.from(document.getElementsByClassName('product')).forEach(product => {
                let count = 0;
                let num = product.getElementsByClassName('addWrapper-num')[0];

                product.getElementsByClassName('addWrapper-plus')[0].addEventListener('click', e => {
                    count++;
                    num.textContent = count;
                });

                product.getElementsByClassName('addWrapper-minus')[0].addEventListener('click', e => {
                    if (count > 0) {
                        count--;
                        num.textContent = count;
                    }
                });
            });

            $('.heart-btn').click(function () {
                var $button = $(this);
                $button.find('.content').toggleClass("heart-active");
                $button.find('.text').toggleClass("heart-active");
                $button.find('.numb').toggleClass("heart-active");
                $button.find('.heart').toggleClass("heart-active");
            });
        },
        error: function (error) {
            console.error(error);
        }
    });

});
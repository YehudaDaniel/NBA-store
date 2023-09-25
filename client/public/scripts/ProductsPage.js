$(document).ready(function () {

    let productTags = [];

    $.ajax({
        type: 'POST',
        url: '/product/products',
        async: true,
        data: { type: document.body.getAttribute('data-page') },
        success: function (res) {
            document.querySelector('.preloader').style.display = 'none';

            for (let i = 0; i < res.length; i++) {
                $('.products').append(newProductGenerator(res[i]));
            }

            productTags = Array.from(document.getElementsByClassName('product'))



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


    document.querySelector('#teamFilter').addEventListener('change', e => {
        const team = e.target.value;
        //secondChild.firstChild.lastChild.innerHTML
        const filtered = productTags.filter((product) => product.querySelector('.product-details .details-text .team').innerHTML.split(': ')[1].trim() === team );
        console.log(productTags[1].querySelector('.product-details .details-text .team').innerHTML.split(': ')[1].trim())
        console.log(team)
        $('.products').empty();
        $('.products').append(filtered);
    });


    function newProductGenerator(detailsProduct) {
        // Convert ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(detailsProduct.image.data);

        // Convert Uint8Array to a binary string
        let binaryString = '';
        uint8Array.forEach(byte => {
            binaryString += String.fromCharCode(byte);
        });
        // Encode the binary string to Base64
        const base64String = btoa(binaryString);
    
        const sizes = detailsProduct.size.join(', ');

        const newProduct = $(`
            <div class="product">
                <div class="img">
                    <img src="data:image/jpg;base64,${base64String}" alt="${detailsProduct.name}" />
                </div>
                <div class="product-details">
                    <div class="details-text">
                        <span class="name">${detailsProduct.name}</span>
                        <span class="amt">Price: ${detailsProduct.price}$</span>
                        <span class="size">Size: ${sizes}</span>
                        <span class="color">color: ${detailsProduct.color}</span>
                        <span class="team">team: ${detailsProduct.team}</span>
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

        return newProduct;
    }
});
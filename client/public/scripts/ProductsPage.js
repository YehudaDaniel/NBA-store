$(document).ready(function () {

    let productTags = [];
    let filtered;

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

    document.querySelector('#teamFilter').addEventListener('change', updateFilters);
    document.querySelector('#sizeSelect').addEventListener('change', updateFilters);
    document.querySelector('#priceSort').addEventListener('change', updateFilters);

    filtered = productTags; // Initialize with all products

    function updateFilters() {
        const selectedTeam = document.querySelector('#teamFilter').value;
        const selectedSize = document.querySelector('#sizeSelect').value;
        const priceOrder = document.querySelector('#priceSort').value;
        let originalOrder;
        
        filtered = productTags.filter((product) => {
            const teamText = product.querySelector('.product-details .details-text .team').innerHTML.split(': ')[1].trim();
            const sizeText = product.querySelector('.product-details .details-text .size').innerHTML.split(': ')[1];

            const teamMatch = selectedTeam === 'All Teams' || teamText === selectedTeam;
            const sizeMatch = selectedSize === 'All Sizes' || sizeText.includes(selectedSize);

            return teamMatch && sizeMatch;
        });
        originalOrder = filtered;
        if (priceOrder === 'lowToHigh') {
            filtered.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.product-details .details-text .amt').innerHTML.split(': ')[1].split('$')[0]);
                const priceB = parseInt(b.querySelector('.product-details .details-text .amt').innerHTML.split(': ')[1].split('$')[0]);
                return priceA - priceB;
            });
        }else if(priceOrder === 'highToLow'){
            filtered.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.product-details .details-text .amt').innerHTML.split(': ')[1].split('$')[0]);
                const priceB = parseInt(b.querySelector('.product-details .details-text .amt').innerHTML.split(': ')[1].split('$')[0]);
                return priceB - priceA;
            });
        }else {
            filtered = originalOrder;
        }

        $('.products').empty();
        $('.products').append(filtered);
    }



    document.querySelector('#resetFiltersButton').addEventListener('click', () => {
        document.querySelector('#teamFilter').value = 'All Teams';
        document.querySelector('#sizeSelect').value = 'All Sizes';
        document.querySelector('#priceSort').value = 'Default';
        updateFilters();
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
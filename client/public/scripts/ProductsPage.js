

$(document).ready(function () {
    
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
            if(count > 0) {
                count--;
                num.textContent = count;
            }
        });
    });

    $('.heart-btn').click(function() {
        var $button = $(this);
        console.log($button);
        $button.find('.content').toggleClass("heart-active");
        $button.find('.text').toggleClass("heart-active");
        $button.find('.numb').toggleClass("heart-active");
        $button.find('.heart').toggleClass("heart-active");
    });
});
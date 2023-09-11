

$(document).ready(function () {
    
    //scripts for the plus minus buttons
    let count = 0;
    
    $('.addWrapper-plus').click(function() {
        count++;
        $(this).find('.addWrapper-num').html(count);
    });

    $('.addWrapper-minus').click(function() {
        if(count > 0) {
            count--;
            $(this).find('.addWrapper-num').html(count);
        }
    });

    $('.heart-btn').click(function() {
        var $button = $(this);

        $button.find('.content').toggleClass("heart-active");
        $button.find('.text').toggleClass("heart-active");
        $button.find('.numb').toggleClass("heart-active");
        $button.find('.heart').toggleClass("heart-active");
    });
});
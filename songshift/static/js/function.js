/**
 * Created by coreysery on 2/2/15.
 */

$(document).ready(function () {

    $('.circle1').click(function AnimateRotate(angle) {
        // caching the object for performance reasons
        var $elem = $('#vrotate');
        angle = 0;
        angle += 75600;

        // we use a pseudo object for the animation
        // (starts from `0` to `angle`), you can name it as you want
        $elem.animate({deg: angle}, {
            duration: 160000,
            step: function (now) {
                // in the step-callback (that is fired each step of the animation),
                // you can use the `now` paramter which contains the current
                // animation-position (`0` up to `angle`)
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'

                });

            }
        });

        var $elem1 = $('.needle img');
        angle = -40;
        angle += 65;


        // we use a pseudo object for the animation
        // (starts from `0` to `angle`), you can name it as you want
        $elem1.animate({deg: angle}, {
            duration: 160000,
            step: function (now) {
                // in the step-callback (that is fired each step of the animation),
                // you can use the `now` paramter which contains the current
                // animation-position (`0` up to `angle`)
                var now1 = now - 40;
                $elem1.css({
                    transform: 'rotate(' + now1 + 'deg)'

                });

            }
        });
    });

    // $('.vinyl').on('swipe', function() {
    //   $(this).hide();
    //})

    //$('.needle').on('click', function() {
    //  $(this).hide();
    //})

     $('.vinyl').on('swipeleft', function(e){
    data = {
        song_id: 24234,
        like: false
    };
    vote(data)
    });
    $('.vinyl').on('swiperight', function(e){
      data = {
        song_id: 24235,
        like: true
    };
    vote(data)
    });

    $('#like').on('click', function () {
        console.log("like");
        data = {
        song_id: 24235,
        like: true
    };
    vote(data)
        //$(this).hide();
    });

    $('#dislike').on('click', function () {
        console.log("dislike");
        //$(this).hide();
        data = {
        song_id: 24235,
        like: false
    };
    vote(data)
    });

    function vote(data) {
        $.ajax({
            type: "POST",
            url: "/newsong",
            data: data,
            cache: false,
            success: function (data1) {
                console.log(data1);
            }
        });
    }

    });

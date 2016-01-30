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

    getNewSong();
    var currentSongID;


    $('.vinyl').on('swipeleft', function (e) {
        data = {
            song_id: currentSongID,
            like: false
        };
        vote(data)
    });
    $('.vinyl').on('swiperight', function (e) {
        data = {
            song_id: currentSongID,
            like: true
        };
        vote(data)
    });

    $('#like').on('click', function () {
        console.log("like");
        data = {
            song_id: currentSongID,
            like: true
        };
        vote(data)
        //$(this).hide();
    });

    $('#dislike').on('click', function () {
        console.log("dislike");
        //$(this).hide();
        data = {
            song_id: currentSongID,
            like: false
        };
        vote(data)
    });

    function getNewSong() {
        $.ajax({
            type: "GET",
            url: "/newsong",
            cache: false,
            datatype: 'JSON',
            success: function (data) {
                handleNewSong(data);
            }
        });
    }

    function handleNewSong(data) {
        data = JSON.parse(data);
        console.log(data);
        // update html from here
        // also save song id
         currentSongID = data.song_id
        $('#Artist').html(data.artist);
        $('#songTitle').html(data.song_title);
        $('.albumimg img').attr('src', data.artwork_url);

    }

    function vote(data) {

        getNewSong();

        $.ajax({
            type: "GET",
            url: "/vote",
            data: data,
            cache: false,
            datatype: 'JSON'
        });
    }



});

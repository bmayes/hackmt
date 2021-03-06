/**
 * Created by coreysery on 2/2/15.
 */
window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

$(document).ready(function () {

    if (window.mobilecheck()) {
        $('head').append('<link rel="stylesheet" type="text/css" href="../static/css/style_mobile.css"/>');
    }

    function updateVinylPlayer(percent_done) {
        var $elem = $('.rneedle');

        var start_angle = -26;
        var end_angle = 0;
        var current = Math.round((end_angle - start_angle) * percent_done) + start_angle;

        $elem.css({
            transform: 'rotate(' + current + 'deg)'
        });

        var VINYL_SPEED = 80;
        currentVinylAngle +=  VINYL_SPEED;

        $('#vrotate').css({
            transform: 'rotate(' + currentVinylAngle + 'deg)'
        })
    }

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

    var currentVinylAngle = 0;
    var currentNextHref;
    var currentSongID;

    getNewSong('');


    $('#like').on('click', function () {
        data = {
            song_id: currentSongID,
            like: true
        };
        vote(data);
        //$(this).hide();
    });

    $('#dislike').on('click', function () {
        data = {
            song_id: currentSongID,
            like: false
        };
        vote(data)
    });

    function getNewSong(next_href) {
        $.ajax({
            type: "GET",
            url: "/newsong",
            cache: false,
            datatype: 'JSON',
            data: {
                'next_href': next_href
            },
            success: function (data) {
                handleNewSong(data);
            }
        });
    }

    function handleNewSong(data) {
        data = JSON.parse(data);
        console.log(data);
        // update html from here
        var title = data.song_title;
        if (data.song_title.length > 40) {
            title = data.song_title.substr(0, 40) + '...';
        }

        $('#songTitle').html(title);
        $('#Artist').html(data.artist);
        if (data.artwork_url) {
            album_art = data.artwork_url;
        } else {
            album_art = '../static/img/default.png';
        }

        $('.albumimg img').attr('src', album_art);

        // also save song id
        currentSongID = data.song_id;
        currentNextHref = data['next_href'];

        toggleLoader();

        //play audio
        $('.controls').append('<audio id="audio"><source src="' + data.stream_url + '" type="audio/mp3"></audio>');
        if ($('.playpause').hasClass('fa-pause')) {
            document.getElementById('audio').play();
        }
        var player = document.getElementById('audio');
        player.ontimeupdate = function () {

            updateVinylPlayer(this.currentTime / this.duration);

            var time = Math.floor(this.currentTime);
            var totalTime = Math.floor(this.duration);

            time = formatTime(time);
            totalTime = formatTime(totalTime);

            $('#tracktime').html(time + ' / ' + totalTime);
        }

    }

    function vote(data) {
        if (currentSongID == null) return;

        if (data.like) console.log('like');
        else console.log('dislike');

        showNewVinyl();
        stop();
        toggleLoader();

        getNewSong(currentNextHref);

        currentSongID = null;

        $.ajax({
            type: "GET",
            url: "/vote",
            data: data,
            cache: false,
            datatype: 'JSON'
        });
    }

    showNewVinyl();

    function showNewVinyl() {
        $('.vinyl img').remove();
        var rand = Math.floor((Math.random() * 3) + 1);
        $('.vinyl').append('<img src="../static/img/vinyl' + rand + '.png" id="vrotate" />');
        setUpVinyl();
    }

    function setUpVinyl() {
        currentVinylAngle = 0;
        $(".vinyl").draggable({
            revert: true,
            stop: function (event, ui) {
                SWIPE_THRESH = 250;
                if (ui.position['left'] > SWIPE_THRESH) {
                    $('.vinyl img').trigger('swiperight');
                    //$(this).hide("slide", { direction: "right" }, 100);
                }
                if (ui.position['left'] < -SWIPE_THRESH) {
                    $('.vinyl img').trigger('swipeleft');
                    //$(this).hide("slide", { direction: "left" }, 100);
                }
            }
        });
        $('.vinyl img').on('swipeleft', function (e) {
            data = {
                song_id: currentSongID,
                like: false
            };
            vote(data)
        });
        $('.vinyl img').on('swiperight', function (e) {
            data = {
                song_id: currentSongID,
                like: true
            };
            vote(data)
        });

    }

    $(document).keyup(function (evt) {
        if (evt.keyCode == 32) {
            $('.playpause').click();
        }
    });

    $('.playpause').on('click', function () {
        var player = document.getElementById('audio');
        if ($(this).hasClass('fa-pause')) {
            if (player) player.pause();
            $(this).toggleClass('fa-play');
            $(this).toggleClass('fa-pause');

        } else {
            if (player) player.play();
            $(this).toggleClass('fa-play');
            $(this).toggleClass('fa-pause');
        }
    });

    function stop() {
        var audioPlayer = document.getElementsByTagName('audio')[0];
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        $('#audio').remove();
    }

    function formatTime(time) {
        var sec = time % 60;
        var min = (time - sec) / 60;

        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }

    function toggleLoader() {
        if ($('#cssload-loader').css('display') == 'none') {
            $('#cssload-loader').css('display', 'block');
            $('.artist').css('display', 'none');
            $('.albumimg img').attr('src', '../static/img/default.png');
        } else {
            $('#cssload-loader').css('display', 'none');
            $('.artist').css('display', 'block');
        }

    }
});

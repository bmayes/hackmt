/**
 * Created by coreysery on 2/17/15.
 */

var triSpacing = 25;

var resizeElem = function() {

    // READJUST TOP/BOTTOM
    var windowHeight    = $(window).height();
    var windowWidth = $(window).width();

    var halfHeight = windowHeight / 2;
    $('.container-fluid').css('height', windowHeight + 'px');
    $('.top').css('height', halfHeight + 'px');
    $('.bottom').css('height', halfHeight + 'px');
    $('.box').css('height', halfHeight + 'px');
//====================================
    //READJUST TRIANGLES

//Height

    var triHeight = $('.tri1').css('border-width');
    triHeight = triHeight.substr(0,(triHeight.length - 2));
    var triMargin = halfHeight - (triHeight*2) - triSpacing ;
    var oldTriHeight = 154;

    $('.tri1').css('top', triMargin + 'px');

    if(halfHeight < ((oldTriHeight*2) + (triSpacing*2))) {
        triHeight = (halfHeight - (triSpacing*2)) / 2;
        $('.tri1').css('border-width', triHeight + 'px');

        var triBorder = triHeight * 0.2;
        $('.tri1').css('border-radius', triBorder + 'px');
        triSpaceSlope(windowHeight)
    }
    else {
        $('.tri1').css('border-width', oldTriHeight + 'px');
        triSpacing = 25;
    }

//WIDTH
    if(windowWidth <768) {
        triWidth = 100;
        $('.tri1').css('border-width', triWidth + 'px');
    }
    else {
        triWidth = 154;
    }




};

var triSpaceSlope = function(x) {
    if(x < 300) {
        return triSpacing = 5;
    }
    else if(x > 710) {
        return triSpacing = 25;
    }
    else {
        triSpacing = (20/415)*x - (785/83);
    }
};

$(window).ready(resizeElem).resize(resizeElem);
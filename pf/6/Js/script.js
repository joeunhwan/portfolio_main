$(document).ready(function(){
    var sect01 = new Swipe($('.sect01')[0], {
        speed: 400,
        auto: 7000,
        continuous: true,
        disableScroll: false,
        stopPropagation: true,
        callback: function (index, elem) {
            $('.sect01 .indicateWrap button').removeClass('on').eq(index).addClass('on');
        }
    });

    $('.sect01 .indicateWrap button').click(function () {
        var _this = $(this);
        var _index = _this.index();
        sect01.slide(_index);
    });

    if(hdIsPop.val() == "Y")
        layerPopFn.open('example'); return false;
});


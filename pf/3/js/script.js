/* 헤더 고정 */

$(document).ready(function(){
  var lnb = $(".header_fix").offset().top;
  $(window).scroll(function() {
    var window = $(this).scrollTop();

    if(lnb <= window) {
      $(".header_fix").addClass("fixed");
    } else {
      $(".header_fix").removeClass("fixed");
    }
  })
});

/* 헤더 고정 */


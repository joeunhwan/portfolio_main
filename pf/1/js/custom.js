$(document).ready(function(){
   
    var map = new GMaps({
      
       div:'#map',   
       lat:37.4999884,
       lng:127.0365213,
       zoom: 17,
   });
    
    /*검색지점에 마커표시*/
    
    map.addMarker({
        lat:37.4999884,
        lng:127.0365213,
        title:"대림코퍼레이션"
    });
    
});
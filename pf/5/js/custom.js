$(document).ready(function(){

//	//변수 ht에 브라우저의 높이값을 저장
//	var ht = $(window).height();	
//	//브라우저의 높이값을 section의 높이값으로 지정
//	$("#wrap > div").height(ht);
//	
//    var i = 0;
    
//	//브라우저가 리사이즈 될 때마다 브라우저와 section의 높이값을 갱신
//	$(window).resize(function(){
//		var ht = $(window).height();	
//		$("#wrap > div").height(ht);
//	});	
	
	
	//메뉴 버튼 클릭시
	$("#menu li").click(function(event){
		event.preventDefault();
		
//		//변수 ht에 브라우저의 높이값 저장
//		ht = $(window).height();
//		
//		//변수 i에 현재 클릭한 li의 순서값을 저장
//		i = $(this).index();
		
		//브라우저의 높이값*박스의 순서값은 현재 박스의 스크롤 위치값과 동일
        var sec_name = $(this).children("a").attr("href");
		var nowTop = $(sec_name).offset().top;		
	
		//해당 스크롤 위치값으로 문서를 이동
		$("html,body").stop().animate({"scrollTop":nowTop},1400);
	});
	
    var box1 = $("#section1").offset().top;
    var box2 = $("#section2").offset().top;
    var box3 = $("#section3").offset().top;
    var box4 = $("#section4").offset().top;
	
	$(window).scroll(function(){	
	
//		//변수 ht에 현재 브라우저의 넓이값 저장
//		ht = $(window).height();
//		
		//변수 scroll에 현재 문서가 스크롤된 거리 저장
		var scroll = $(window).scrollTop();
		$("#menu li").removeClass("on");
		
		if(scroll>=box1 && scroll< box2){
			
			$("#menu li").eq(0).addClass("on");
		}
		else if(scroll>=box2 && scroll< box3){
		
			$("#menu li").eq(1).addClass("on");
		}
		else if(scroll>=box3 && scroll< box4){
			
			$("#menu li").eq(2).addClass("on");
		}
		else if(scroll>=box4){
			
			$("#menu li").eq(3).addClass("on");
		}
		
	});
	
});
















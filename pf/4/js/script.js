	let text_line, particles, subtext_line, description; 
	let x = 0, y = 0; 
	let mx = 0, my = 0; 
	const speed = 0.5; 
	const loop = () =>{ 
	mx += (x - mx) * speed; 
	my += (y - my) * speed; 
	window.requestAnimationFrame(loop); 
} 
	const mouseFunc = (e) =>{ 
		x = (e.clientX-window.innerWidth/2), y = (e.clientY-window.innerHeight/2); 
		text_line.style.transform = `translate(${-(mx/20)}px, ${-(my/20)}px)`; 
		particles.style.transform = `translate(${(mx/100)}px, ${(my/100)}px)`; 
		subtext_line.style.transform = `translate(${(mx/10)}px, ${(my/10)}px)`; 
		description.style.transform = `translate(${(mx/30)}px, ${(my/30)}px)`; 
	} 
	window.onload = () =>{ 
		text_line = document.getElementById("text_line"); 
		particles = document.getElementById("particles"); 
		subtext_line = document.getElementById("subtext_line"); 
		description = document.getElementById("description"); 
		loop(); 
		window.addEventListener("mousemove", mouseFunc); 
	}


jQuery(document).ready(function(){
	$('#wrapper #text_line #title').mousemove(function(e){
		var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
		var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
		$('#wrapper #text_line #title').css('text-shadow', +rYP/10+'px '+rXP/80+'px rgba(227,6,19,.8), '+rYP/8+'px '+rXP/60+'px rgba(255,237,0,1), '+rXP/70+'px '+rYP/12+'px rgba(0,159,227,.7)');
	});
	});



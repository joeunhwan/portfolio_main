/**********************************************************************************
	IE 버젼 체크
**********************************************************************************/
var ie_Ver = (function() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
		}
	return rv;
})();

/**********************************************************************************
	document.ready
**********************************************************************************/
$(document).ready(function() {
	if(ie_Ver == 7 || ie_Ver == 8) {
		$('#wrap').css({'min-width' : 1200});
	}
	gnbFn.init();
	snbFn.init();

	/* s : design select box */
	if($('.select_custom').length > 0) {
		$('.select_custom > select').change(function() {
			var _this = $(this);
			var _selectVal = $('option:selected', _this).text();

			_this.prev().text(_selectVal);
		});
	}
	/* e : design select box */

	/* s : scroll Top */
	$('.btnGoTop a ').click(function(e) {
		e.preventDefault();
		$('body, html').animate({scrollTop : 0});
	});
	/* e : scroll Top */

	designChk.init(); //design checkbox
	inpPlacehoder.init();//placeholder
});


/**********************************************************************************
	window.resize
**********************************************************************************/
$(window).resize(function() {
	if(ie_Ver != 7 || ie_Ver != 8) {
		gnbFn.winResize();
		snbFn.winResize();
	}
});

/**********************************************************************************
	GNB
**********************************************************************************/
var gnbFn = {
	screen : null,
	init : function() {
		this.gnbWrap = $('#gnb');
		this.depth01 = $('.depth01', this.gnbWrap);
		this.depth02 = $('.depth02', this.depth01);
		this.depth03 = $('.depth03', this.depth02);
		this.winW = $(window).width();

		if(ie_Ver == 7 || ie_Ver == 8){
			$('.gnb-scrollbar', this.gnbWrap).hide();
			this.webGnb();
			return;
		}

		/* s : 테블릿, 모바일 메뉴 open/close스크립트 */
		$('#header .tnbWrap .btnOpenGnb, #gnb .btnCloseGnb').click(function() {
			if(!gnbFn.gnbWrap.hasClass('open')) {
				gnbFn.gnbWrap.before('<div class="dim"></div>');
				gnbFn.gnbWrap.show('fast', function() {
					$('.dim').fadeIn('fast');
					$(this).addClass('open');
				});
				$('#gnb, .dim').bind('touchmove', function(e) {
					e.preventDefault();
				});
				gnbFn.gnbScrolFn();
				setTimeout(function() {gnbFn.gnbScrollBox.update(true);}, 300);
			}else{
				gnbFn.gnbWrap.on('transitionend', function() {
					$(this).hide();
					gnbFn.gnbWrap.unbind('transitionend');
				}).removeClass('open');
				$('.dim').fadeOut(500, function() {
					$(this).remove();
				});
				$('#gnb, .dim').unbind('touchmove');
				gnbFn.gnbScrollBox.destroy(true, true);
			}
		});
		/* e : 테블릿, 모바일 메뉴 open/close스크립트 */

		/* s : 해상도별 GNB스크립트 초기 설정 */
		if(this.winW > 1200) {
			this.screen = 'pc';
			$('.gnb-scrollbar', this.gnbWrap).hide();
			this.webGnb();
		}else{
			this.screen = 'mobile';
			$('.gnb-scrollbar', this.gnbWrap).show();
			this.mobileGnb();
		}
		/* e : 해상도별 GNB스크립트 초기 설정 */
	},
	webGnb : function() {
		$('> li > a', gnbFn.depth01).click(function(e) {
			if($(this).parent().hasClass('m07')) return;
			e.preventDefault();
		});
		$('> ul > li > a', gnbFn.depth02).click(function(e) {
			var _this = $(this);
			if(_this.parent().parent().hasClass('noDepth')) {return;}
			e.preventDefault();
		});
		$('> li > a', gnbFn.depth03).click(function(e) {
			var _this = $(this);
			if(_this.parent().parents().parents('li').hasClass('hideMenu')) {e.preventDefault();}
		});
		/*$('> li', this.depth01).hover(
			function() {
				if($(this).hasClass('m07')) return;
				var _this = $(this);
				$('#gnb').addClass('hover');
				_this.addClass('on');
				$('.depth02', _this).stop(true, true).slideDown();
				//$('.gnbImgBox', this.gnbWrap).show();
			},
			function() {
				if($(this).hasClass('m07')) return;
				var _this = $(this);
				$('#gnb').removeClass('hover');
				_this.removeClass('on');
				$('.depth02', _this).stop(true, true).slideUp();
				//$('.gnbImgBox', this.gnbWrap).hide();
			}
		);*/
		$('> li', this.depth01).mouseenter(function() {
			if($(this).hasClass('m07')) return;
				var _this = $(this);
				$('#gnb').addClass('hover');
				$('li', this.depth01).removeClass('on');
				_this.addClass('on');
				$('.depth02', this.depth01).hide();
				$('.depth02', _this).stop(true, false).slideDown();
		});
		$(this.depth01).mouseleave(function() {
			var _this = $(this);
			$('#gnb').removeClass('hover');
			$('li', this.depth01).removeClass('on');
			$('.depth02', _this).slideUp();
		});
	},
	mobileGnb : function() {
		$('> li > a', gnbFn.depth01).click(function(e) {
			e.preventDefault();
			var _this = $(this);
			if(_this.parent().hasClass('m07')) return;
			$('.depth02', gnbFn.depth01).slideUp();
			$('.depth03', gnbFn.depth01).slideUp();
			if(!_this.parent().hasClass('on')) {
				$('> li', gnbFn.depth01).removeClass('on');
				$('> ul > li', gnbFn.depth02).removeClass('on');
				_this.parent().addClass('on');
				_this.next().slideDown();
			}else{
				_this.parent().removeClass('on');
				_this.next().slideUp();
			}
			setTimeout(function() {gnbFn.gnbScrollBox.update(true);}, 800);
		});

		$('> ul > li > a', gnbFn.depth02).click(function(e) {
			var _this = $(this);
			if(_this.parent().parent().hasClass('noDepth')) {return;}

			e.preventDefault();
			var _this = $(this);
			if(_this.parent('li').hasClass('hideMenu')) {return;}
			$('.depth03', gnbFn.depth01).slideUp();
			if(!_this.parent().hasClass('on')) {
				$('> ul > li', gnbFn.depth02).removeClass('on');
				_this.parent().addClass('on');
				_this.next().slideDown();
			}else{
				_this.parent().removeClass('on');
				_this.next().slideUp();
			}
			setTimeout(function() {gnbFn.gnbScrollBox.update(true);}, 800);
		});
	},
	gnbScrolFn : function() {
		this.gnbScrollBox = new Swiper('.gnbScroll', {
			scrollbar: '.gnb-scrollbar',
			direction: 'vertical',
			slidesPerView: 'auto',
			mousewheelControl: true,
			mousewheelForceToAxis: true,
			freeMode: true
		});
	},
	winResize : function() {
		this.winW = $(window).width();
		if(this.winW > 1200 && this.screen == 'mobile') {
			this.screen = 'pc';
			this.gnbWrap.show().removeClass('open');
			this.depth01.find('li').removeClass('on');
			this.depth02.hide();
			this.depth03.show();
			$('> li a', gnbFn.depth01).unbind();
			if($('.dim').length > 0) {
				$('.dim').remove();
			}
			$('.gnb-scrollbar', this.gnbWrap).hide();
			$('#gnb, .dim').unbind('touchmove');
			this.webGnb();
		}else if(this.winW <= 1200 && this.screen == 'pc'){
			this.screen = 'mobile';
			this.gnbWrap.hide();
			$('#gnb').removeClass('hover');
			$('> li', gnbFn.depth01).unbind();
			$('.gnb-scrollbar', this.gnbWrap).show();
			this.mobileGnb();
			//$('.gnbImgBox', this.gnbWrap).hide();
		}

		if($('#header .tnbWrap .btnOpenGnb').is(':visible') && this.screen == 'mobile') {
			if(!this.gnbWrap.is(':hidden')) {
				gnbFn.gnbScrollBox.update(true);
			}
		}
	}
}


/*SNB*/

var snbFn = {
	screen : null,
	init : function() {
		this.snbWrap = $('ft_block1');
		this.snbIn = $('.ft_liner', this.snbWrap);
		this.subDepth = $('ul', this.snbIn);
		this.winW = $(window).width();

		if(ie_Ver == 7 || ie_Ver == 8){
			return;
		}

		
		if(this.winW < 1200) {
			this.screen = 'mobile';
			this.snbClick();
		}else{
			this.screen = 'pc';
		}
		
	},
	snbClick : function() {
		$(' > li > span', this.snbIn).click(function() {
			var _this = $(this);

			if(!_this.parent().hasClass('on')) {
				$(' > li', snbFn.snbIn).removeClass('on');
				$(' > li ul', snbFn.snbIn).slideUp();
				_this.parent().addClass('on');
				_this.next().slideDown();
			}else{
				_this.parent().removeClass('on');
				_this.next().slideUp();
			}
		});
	},
	winResize : function() {
		this.winW = $(window).width();
		if(this.winW > 1200 && this.screen == 'mobile') {
			this.screen = 'pc';
			$(' > li > span', this.snbIn).unbind();
		}else if(this.winW <= 1200 && this.screen == 'pc'){
			this.screen = 'mobile';
			snbFn.snbClick();
		}
	}
}

/**********************************************************************************
	다른제품 보기
**********************************************************************************/
var otherPrdGallery = {
	init : function() {
		this.swipe();
		this.boxSet();
		$('.otherPrdGallery .btnPrev').click(function() {
			otherPrdGallery.otherPrdSlider.slidePrev();
		});
		$('.otherPrdGallery .btnNext').click(function() {
			otherPrdGallery.otherPrdSlider.slideNext();
		});
		$(window).resize(function() {otherPrdGallery.boxSet();});
	},
	swipe : function() {
		this.otherPrdSlider = new Swiper('.otherPrdGallery .prdGallery', {
			slidesPerView: 5
		});
	},
	boxSet : function() {
		this.browseSize = $(window).width();
		this.otherPrdGallery = $('.otherPrdGallery');
		this.prdGallery = $('.prdGallery', this.otherPrdGallery);
		this.swiperWrap = $('> ul', this.prdGallery);
		this.swiperSlide = $('> li', this.swiperWrap);
		this.indexNum = $('.swiper-slide-active', this.swiperWrap).index();

		this.otherPrdSlider.destroy(true, false);
		if(this.browseSize > 1200) {
			this.otherPrdSlider = new Swiper('.otherPrdGallery .prdGallery', {
				slidesPerView: 5
			});
			this.swiperSlide.css({'width' : this.prdGallery.outerWidth() / 5});
			this.swiperWrap.css({'width' : (this.prdGallery.outerWidth() / 5) * this.swiperSlide.length});
		}else if(this.browseSize < 1200 && this.browseSize > 720) {
			this.otherPrdSlider = new Swiper('.otherPrdGallery .prdGallery', {
				slidesPerView: 3
			});
			this.swiperSlide.css({'width' : this.prdGallery.outerWidth() / 3});
			this.swiperWrap.css({'width' : (this.prdGallery.outerWidth() / 3) * this.swiperSlide.length});
		}else{
			this.otherPrdSlider = new Swiper('.otherPrdGallery .prdGallery', {
				slidesPerView: 2
			});
			this.swiperSlide.css({'width' : this.prdGallery.outerWidth() / 2});
			this.swiperWrap.css({'width' : (this.prdGallery.outerWidth() / 2) * this.swiperSlide.length});
		}

		this.otherPrdSlider.slideTo(this.indexNum);
		//this.otherPrdSlider.update(true);
	}
}

/**********************************************************************************
	Form
**********************************************************************************/
/* design checkbox */
var designChk = {
	init : function() {
		this.checkbox = $('.designCheck');

		if(this.checkbox.length > 0) {
			this.checkbox.each(function(idx) {
				var _this = $(this);
				var _checkBox = $('input:checkbox', _this);

				if(_checkBox.prop('checked')) {
					_this.addClass('checked');
				}else{
					_this.removeClass('checked');
				}
			});

			$('input:checkbox', this.checkbox).click(function() {
				var _this = $(this);

				if(_this.hasClass('allChk')) {
					designChk.clickAll(_this);
				}else{
					designChk.clickFn(_this);
				}
			});
		}
	},
	clickFn : function(thisChk) {
		var _this = thisChk;
		var _groupName = _this.attr('name');
		var _length = $("input:checkbox[name=" + _groupName + "]", this.checkbox).length;
		var _allChk = null;
		$("input:checkbox[name=" + _groupName + "]", this.checkbox).each(function() {
			if($(this).hasClass('allChk')) {
				_allChk = true;
			}
		});

		if(_this.prop('checked')) {
			if(_allChk && _length-1 == $("input:checkbox[name=" + _groupName + "]:checked", this.checkbox).length){
				$("input:checkbox[name=" + _groupName + "].allChk", this.checkbox).prop('checked', true).parent().addClass('checked');
			}
			_this.parent().addClass('checked');
		}else{
			if(_allChk){
				$("input:checkbox[name=" + _groupName + "].allChk", this.checkbox).prop('checked', false).parent().removeClass('checked');
			}
			_this.parent().removeClass('checked');
		}
	},
	clickAll : function(thisEle) {
		var _this = thisEle;
		var _groupName = _this.attr('name');

		if(_this.prop('checked')) {
			$("input:checkbox[name=" + _groupName + "]", this.checkbox).each(function() {
				$(this).prop('checked', true).parent().addClass('checked');
			});
		}else{
			$("input:checkbox[name=" + _groupName + "]", this.checkbox).each(function() {
				$(this).prop('checked', false).parent().removeClass('checked');
			});
		}
	}
}

/* design radio */
var designRadio = {
	init : function(inpName, chkIndex) {
		var radioBundle = $(".designRadio  input:radio[name=" + inpName + "]");

		$.each(radioBundle, function(i, val) {
			if(i == chkIndex || $(this).prop('checked')) {
				$(this).prop("checked", true);
				$(this).parents(".designRadio").addClass("checked");
			}else{
				$(this).prop("checked", false);
				$(this).parents(".designRadio").removeClass("checked");
			}
		});

		radioBundle.click(function() {
			var _inpName = $(this).attr('name');
			var _radioBundle = $(".designRadio  input:radio[name=" + _inpName + "]");
			var _idx = _radioBundle.index(this);
			designRadio.clickFn(radioBundle, _idx);
		});
	},
	clickFn : function(_radioBundle, idx) {
		$.each(_radioBundle, function(i, val) {
			if(i == idx) {
				$(this).prop("checked", true);
				$(this).parents(".designRadio").addClass("checked");
			}else{
				$(this).prop("checked", false);
				$(this).parents(".designRadio").removeClass("checked");
			}
		});
	}
}

/* placehoder */
var inpPlacehoder = {
	init : function() {
		if($('.inpPlacehoder').length > 0) {

			$.each($('.inpPlacehoder input'), function() {
				var _this = $(this);
				var _val = _this.val();

				if(_val != '') {
					_this.parent().find('> span').hide();
				}
			});

			$('.inpPlacehoder input').focusin(function() {
				var _this = $(this);
				var _val = _this.val();

				inpPlacehoder.focusin(_this, _val);
			}).focusout(function() {
				var _this = $(this);
				var _val = _this.val();

				inpPlacehoder.focusout(_this, _val);
			});
		}
	},
	focusin : function(targetEle, val) {
		if(val == '') {
			targetEle.parent().find('> span').hide();
		}
	},
	focusout : function(targetEle, val) {
		if(val == '') {
			targetEle.parent().find('> span').show();
		}
	}
}

/**********************************************************************************
	Toggle List
**********************************************************************************/
$(document).on('click', '.listWrap.typeToggle .btn01, .listWrap.typeToggle .btn02', function() {
	var _this = $(this);
	var _parent = _this.parent('li');
	var _viewCont = _parent.next('.viewCont');

	if(_viewCont.is(':hidden')) {
		_viewCont.slideDown();
		_this.removeClass('btn01').addClass('btn02').text('접기');
	}else{
		_viewCont.slideUp();
		_this.removeClass('btn02').addClass('btn01').text('열기');
	}
});

$(document).on('click', '.listWrap.history .btn01, .listWrap.history .btn02', function() {
	var _this = $(this);
	var _parent = _this.parent('li');
	var _viewCont = _parent.next('.viewCont');

	if(_viewCont.is(':hidden')) {
		_viewCont.slideDown();
		_this.removeClass('btn01').addClass('btn02').text('접기');
	}else{
		_viewCont.slideUp();
		_this.removeClass('btn02').addClass('btn01').text('열기');
	}
});

$(document).on('click', '.listWrap.fapType .btn01, .listWrap.fapType .btn02', function() {
	var _this = $(this);
	var _parent = _this.parent('li');
	var _viewCont = _parent.next('.viewCont');

	if(_viewCont.is(':hidden')) {
		_viewCont.slideDown();
		_this.removeClass('btn01').addClass('btn02').text('접기');
	}else{
		_viewCont.slideUp();
		_this.removeClass('btn02').addClass('btn01').text('열기');
	}
});

/**********************************************************************************
	video detail script
**********************************************************************************/
var videoScroll = {
	road : function() {
		this.ScrolFn();
	},
	ScrolFn : function() {
		this.videoSwiper = new Swiper('.videoDetailWrap .subScript', {
			scrollbar: '.script-scrollbar',
			direction: 'vertical',
			slidesPerView: 'auto',
			mousewheelControl: true,
			mousewheelForceToAxis: true,
			freeMode: true
		});
	},
	resize : function() {
		$(window).resize(function() {
			videoScroll.update(true);
		});
	}
}

/**********************************************************************************
	responsive box position list
**********************************************************************************/
var flexBlockList = {
	init : function(wrapper, colName, colNum) {
		this.wrapper = wrapper;
		this.colNum = colNum;
		this.isoto = $(wrapper).isotope({
			itemSelector: colName,
			layoutMode: 'masonry'
		});

		this.rePos();

		$(window).resize(function() {
			flexBlockList.rePos();
		});

	},
	rePos : function() {
		var _winW = $(window).width();
		var _colW;

		if(_winW >= 1200) {
			_colW = 1200 / this.colNum.numP;
		}else if(_winW < 1200 && _winW > 720) {
			_colW = (_winW - 60) / this.colNum.numT;
		}else{
			_colW = (_winW - 30) / this.colNum.numM;
		}

		$('li', this.wrapper).css('width', _colW);

		this.isoto.isotope({
			masonry: {
				columnWidth: _colW
			}
		});
	}
}

/**********************************************************************************
	Layer Popup
**********************************************************************************/
var layerPopFn = {
	open : function(id) {
		this.strWrap = id;
		this.popWrapper = $('#' + id);
		this.popWrapper.show();
		this.popWrapper.before('<div class="layerDim"></div>');

		if($('#' + id + ' .imgSlideWrap').length > 0 && !this[this.strWrap]) {
			this.imgSlideFn();
		}else{
			this[this.strWrap].setup();
		}
		this.posCalculat();

		$(window).resize(function() {
			layerPopFn.posCalculat();
		});
	},
	posCalculat : function() {
		this.winW = $(window).width();
		this.winH = $(window).height();
		this.wrapW = this.popWrapper.outerWidth();
		this.wrapH = this.popWrapper.outerHeight();
		this.posX = (this.winW - this.wrapW) / 2;
		if(this.winH <= this.wrapH) {
			this.posY = 0;
		}else{
			this.posY = (this.winH - this.wrapH) / 2;
		}

		if(this.winW <= 720) {
			this.popWrapper.css({'top' : this.posY});
		}else{
			this.popWrapper.css({'left' : this.posX, 'top' : this.posY});
		}
console.log();
	},
	imgSlideFn : function() {
		this[this.strWrap] = new Swipe($('#' + this.strWrap + ' .imgSlideWrap')[0], {
			speed: 400,
			//auto: 7000,
			continuous: true,
			disableScroll: false,
			stopPropagation: true,
			callback: function(index, elem) {
				$('#' + layerPopFn.strWrap + ' .indicate button').removeClass('on').eq(index).addClass('on');
			}
		});

		$('#' + this.strWrap + ' .indicate button').click(function() {
			var _this = $(this);
			var _index = _this.index();
			layerPopFn[layerPopFn.strWrap].slide(_index);
		});
	},
	close : function(id) {
		$('#' + id).hide();
		$('.layerDim').remove();
	}
}
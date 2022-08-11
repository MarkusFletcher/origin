history.scrollRestoration = "manual";

var isTouchDevice = (('ontouchstart' in window)
         || (navigator.MaxTouchPoints > 0)
         || (navigator.msMaxTouchPoints > 0));
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
isTouchDevice = true;
} else {
isTouchDevice = false;
}

window.onload = () => {

	let line = qs('.roadmap__line'),
		lineActive = qs('.roadmap__line span'),
		lastListItem = qs('.roadmap__cont li:last-child'),
		titles = qsa('.roadmap__cont h3'),
		scale = 0;

	let scrollInEl = qs('.about'),
		sticky = qs('.sale-bar');

	let stickyShifted = qsa('.header__logo, .header__hamb');

	line.style.height = (line.clientHeight - lastListItem.clientHeight) + 'px';
	let lineHeight = line.clientHeight;

	const raf = window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	    window.msRequestAnimationFrame;

    (function step() {

    	if(scrollInEl.getBoundingClientRect().top <= 0) {
    		sticky.classList.add('active');

    		if(window.innerWidth < 768) {
    			stickyShifted.forEach((el) => {
    				el.style.transform = `translate3d(0,${qs('.sale-bar').clientHeight}px,0)`;
    			})
    		}
    	} else {
    		sticky.classList.remove('active');

    		if(window.innerWidth < 768) {
    			stickyShifted.forEach((el) => {
    				el.style.transform = `translate3d(0,0,0)`;
    			})
    		}
    	}

    	scale = (rectBottom(line) - lineHeight - window.innerHeight/2) / -lineHeight;

    	if(inViewport(line)) {
    		lineActive.style.transform = `scale3d(1, ${scale}, 1)`;
    	}

    	titles.forEach((num)=>{
    		if(rectTop(num) <= 0) {
    			num.classList.add('active');
    		} else {
    			num.classList.remove('active');
    		}
    	})
    	
   		window.requestAnimationFrame(step);
    })();

	function rectBottom (el) {
		var rect = el.getBoundingClientRect();
		return rect.bottom;
	}
	function rectTop (el) {
		var rect = el.getBoundingClientRect();
		return rect.top - window.innerHeight/2 + rect.height/2;
	}
	function inViewport (el) {
		var rect = el.getBoundingClientRect();
		return rect.bottom >= 0 && rect.top - window.innerHeight <= 0;
	}
}


document.addEventListener("DOMContentLoaded", function() {

	let scrollHeight = document.scrollingElement.scrollHeight - window.innerHeight,
	    currentScroll;
	let showScroll = qs('.js-scroll');
	window.onscroll = () => {
	    currentScroll = document.scrollingElement.scrollTop;
		currentScroll = Math.round(currentScroll / scrollHeight * 100);
	    showScroll.innerHTML = currentScroll + '%';
	}

	
	let questions = qsa('.faq__question');

	questions.forEach(el => {
		el.onclick = (e) => {
			let answer = el.nextElementSibling;
			if(el.classList.contains('active')) {
				el.classList.remove('active');
				answer.style.height = '0px';
			} else {
				el.classList.add('active');
				answer.style.height = answer.scrollHeight + 'px';
			}
		};
	})


	var svgElement = qs('.hero__mask');
	var maskedElement = qs('#mask-circle');
	var circleFeedback = qs('#circle-shadow');
	var svgPoint = svgElement.createSVGPoint();

	function cursorPoint(e, svg) {
	    svgPoint.x = e.clientX;
	    svgPoint.y = e.clientY;

	    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
	}

	function update(svgCoords) {
	    maskedElement.setAttribute('cx', svgCoords.x);
	    maskedElement.setAttribute('cy', svgCoords.y);
	    circleFeedback.setAttribute('cx', svgCoords.x);
	    circleFeedback.setAttribute('cy', svgCoords.y);
	}

	window.addEventListener('mousemove', function(e) {
		if(e.clientY <= 50 || e.clientY + document.scrollingElement.scrollTop > qs('.hero').clientHeight) {
			maskedElement.setAttribute('r', 0);
			circleFeedback.setAttribute('r', 0);
		} else {
			maskedElement.setAttribute('r', '15%');
			circleFeedback.setAttribute('r', '15%');
		}

	  update(cursorPoint(e, svgElement));
	}, false);


	let hamb = qs('.header__hamb'),
		menu = qs('.nav-mob'),
		close = qs('.header__close');

	var scrolled;

	hamb.onclick = () => {
		scrolled = document.documentElement.scrollTop;

		setTimeout(() => {
			document.scrollingElement.style.height = '100vh';
			document.scrollingElement.style.overflow = 'hidden';
			document.body.style.height = '100vh';
			document.body.style.overflow = 'hidden';
		}, 300)
		menu.classList.add('active');
	}
	close.onclick = () => {
		document.scrollingElement.style.height = 'auto';
		document.scrollingElement.style.overflow = 'unset';
		document.body.style.height = 'auto';
		document.body.style.overflow = 'unset';

		document.documentElement.scrollTop = scrolled;
		menu.classList.remove('active');
	}


	let video = qs('.hero__video');
	const player = new Plyr('#player');

	if(isTouchDevice) {

		video.classList.remove('cursor');

		video.onclick = () => {
			if(video.classList.contains('playing') && !video.classList.contains('clicked')) {
				video.classList.add('clicked');

				setTimeout(()=> {
					video.classList.remove('clicked');
				}, 1500)
			}
		}
	}

	qs('.play').onclick = () => {
		player.play();
		video.classList.add('playing');
	}
	qs('.pause').onclick = () => {
		player.pause();
		video.classList.remove('playing');
	}

	player.on('ended', (event) => {
	  	video.classList.remove('playing');
	});

});


function qs (selector, searchIn) {
	return searchIn ? searchIn.querySelector(selector) : document.querySelector(selector)
}
function qsa (selector, searchIn) {
	return searchIn ? searchIn.querySelectorAll(selector) : document.querySelectorAll(selector)
}
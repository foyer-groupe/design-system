(function(){
	const menu         = document.getElementById('menu');
	const menuBtn      = document.querySelectorAll('.menu-button');
	const searchShadow = document.querySelector('.doc-search-dropshadow');
	const mobileMenu   = document.querySelector('.mobile-navigation');
	const menuToggle   = menu.querySelectorAll('[aria-controls]');

	var closeMenu = function(){
			
			menuBtn.forEach(function(menuB){
				menuB.classList.remove('is-open');
				menuB.setAttribute('aria-expanded', 'false');
			});

			menu.classList.remove('is-open');
			menu.setAttribute('aria-hidden', 'true');

			if ( mobileMenu ) {
				mobileMenu.classList.remove('is-open');
			}
		},
		openMenu = function() {
			menuBtn.forEach(function(menuB){
				menuB.classList.remove('is-open');
				menuB.setAttribute('aria-expanded', 'false');
			});

			menu.classList.add('is-open');
			menu.setAttribute('aria-hidden', 'false');

			menu.querySelector('.doc-main-nav > li:first-child a').focus();

			if ( mobileMenu ) {
				mobileMenu.classList.add('is-open');
			}
		}

	/**
	 * Open Menu
	 */
	if ( menuBtn ) {
		console.log(menuBtn);
		menuBtn.forEach(function(element){
			console.log(element);
			element.addEventListener('click', function(){
				if ( this.classList.contains('is-open') ) {
					closeMenu();
				} else {
					openMenu();
				}
			});
		});
	}

	/**
	 * Drop search shadow on click to close everything's open
	 */
	if ( searchShadow ) {
		searchShadow.addEventListener('click', closeMenu);
	}

	/**
	 * Submenu interactions
	 */
	if ( menuToggle ) {
		menuToggle.forEach(function(tog){
			tog.addEventListener('click', function(e){
				var parent = e.target.closest('.is-toggle-only'),
					button = parent.querySelector('button'),
					list   = document.getElementById( button.getAttribute('aria-controls') );

				if ( parent.classList.contains('is-active') ) {
					parent.classList.remove('is-active');
					list.setAttribute('aria-hidden', 'true');
					button.setAttribute('aria-expanded', 'false');
				} else {
					parent.classList.add('is-active');
					list.setAttribute('aria-hidden', 'false');
					button.setAttribute('aria-expanded', 'true');
				}
			});
		});
	}

	/**
	 * Timeline
	 */
	var timeline = document.querySelector(".timeline");

	if ( timeline ) {
		var line     = timeline.querySelector(".time-line"),
			progress = timeline.querySelector(".line"),
			events   = timeline.querySelectorAll(".event-item"),
			move     = function() {
				var timelineRec = timeline.getBoundingClientRect(),
					timeTop     = timelineRec.top,
					timeBot     = timelineRec.bottom,
					scrollT     = window.pageYOffset || document.body.scrollTop,
					bodyRec     = document.body.getBoundingClientRect(),
					winHeight   = document.body.clientHeight,
					timeHeight  = parseInt( getComputedStyle(line).top ),
					treshold    = winHeight / 2 - timeHeight;

				progress.style.height = scrollT - (winHeight / 3 + timeHeight) + "px";

				if ( scrollT - treshold >= timeTop - winHeight && timeBot - winHeight > 0 - treshold ) {
					events.forEach(function(el) {
						var eventRec = el.getBoundingClientRect(),
							a = eventRec.top - bodyRec.top;
						scrollT - treshold >= a - winHeight ? el.classList.add("GoGoGo") : el.classList.remove("GoGoGo")
					});
				}
			};

		window.addEventListener('scroll', function() {
			window.requestAnimationFrame(move);
		});
	}

	/**
	 * Show code preview with HighlightJS
	 */
	hljs.initHighlightingOnLoad();

	document.querySelectorAll('pre code').forEach( function(el) {
		const tabPanel = el.closest( '[role="tabpanel"]' );

		if(tabPanel) {
			const textArea = document.createElement('textarea');
			textArea.innerHTML = el.innerHTML;
			textArea.tabIndex = '-1';
			textArea.className = 'doc-to-copy';
			textArea.style.position = 'absolute';
			textArea.style.opacity = '0.01';

			tabPanel.insertBefore( textArea,  tabPanel.firstChild);
		}
	});

	document.querySelectorAll('pre code.html').forEach(function(el){
		el.innerHTML = el.innerHTML
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");

		el.style.visibility = 'visible';
	});

})();
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback/*, thisArg*/) {
        var T, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

// Polyfill Closest();
// Reference: https://developer.mozilla.org/fr/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType == 1); 
        return null;
    };
}

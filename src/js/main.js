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

	/**
	 * Tabs controls
	 */
	document.querySelectorAll('.doc-tabs [role="tab"]').forEach((el) => {
		el.addEventListener('click', (ev) => {
			const target = ev.target, currTabs = target.closest('.doc-tabs'), targetID = target.getAttribute('href');

			// Current on tab
			currTabs.querySelectorAll('[role="tab"]').forEach(el => el.setAttribute('aria-selected', 'false'));
			target.setAttribute('aria-selected', 'true');

			// Current on tab panel
			currTabs.querySelectorAll('[role="tabpanel"]').forEach(el => el.setAttribute('aria-expanded', 'false'));
			document.querySelector(targetID).setAttribute('aria-expanded', 'true');

			return false;
		});
	});

	/**
	 * Code/Doc Help control
	 */
	document.querySelectorAll('.doc-help').forEach((el) => el.style.display = '');
	document.querySelectorAll('.doc-btn-help button').forEach((el) => {
		el.addEventListener('click', (ev) => {
			const target = ev.currentTarget;
			target.classList.toggle('is-active');
			const helps = target.closest('.doc-tabs').querySelectorAll('.doc-help');
			helps.forEach(e => {
				target.classList.contains('is-active') ? e.style.display = '' : e.style.display = 'none'
			});
		});
	});
})();
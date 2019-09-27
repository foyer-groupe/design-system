(function(){
	const menu         = document.getElementById('menu');
	const menuBtn      = document.getElementById('menu-button');
	const searchShadow = document.querySelector('.doc-search-dropshadow');
	const menuToggle   = menu.querySelectorAll('[aria-controls]');

	var closeMenu = function(){
			menuBtn.classList.remove('is-open');
			menuBtn.setAttribute('aria-expanded', 'false');
			menu.classList.remove('is-open');
			menu.setAttribute('aria-hidden', 'true');
		},
		openMenu = function() {
			menuBtn.classList.add('is-open');
			menuBtn.setAttribute('aria-expanded', 'true');
			menu.classList.add('is-open');
			menu.setAttribute('aria-hidden', 'false');
		}

	/**
	 * Open Menu
	 */
	if ( menuBtn ) {
		menuBtn.addEventListener('click', function(){
			if ( this.classList.contains('is-open') ) {
				closeMenu();
			} else {
				openMenu();
			}
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
	 * Show code preview with HighlightJS
	 */
	hljs.initHighlightingOnLoad();

	$( 'pre code' ).each( function() {
		var code = $(this).prop('innerHTML');
		$(this).closest( '[role="tabpanel"]' ).prepend( '<textarea tabindex="-1" class="doc-to-copy" style="position: absolute; opacity: 0.01">' + code + '</textarea>' );
	} );
	$('pre code.html').each(function(key, element){
		element = $(element);
		element.html(
			element.html()
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;")
		);
		$(this).css({visibility: 'visible'});
	});

})();
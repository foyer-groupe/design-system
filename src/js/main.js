(function(){
	const menu = document.getElementById('menu');
	const menuBtn = document.getElementById('menu-button');
	const searchShadow = document.querySelector('.doc-search-dropshadow');

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
	menuBtn.addEventListener('click', function(){
		if ( this.classList.contains('is-open') ) {
			closeMenu();
		} else {
			openMenu();
		}
	});

	/**
	 * Drop search shadow on click to close everything's open
	 */
	searchShadow.addEventListener('click', closeMenu);

})();
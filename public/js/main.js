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

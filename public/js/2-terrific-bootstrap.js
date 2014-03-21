/**
 * Terrific Bootstrap
 */

(function ($) {
	$(document).ready(function () {
		var $html = $('html');
		window.application = new Tc.Application($html);
		application.registerModules($html);
		application.start();
	});
})(Tc.$);
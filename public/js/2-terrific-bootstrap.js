/**
 * Terrific Bootstrap
 *
 * Defined here in PHP instead as single JS file in order
 * to use PHP path functions like get_template_directory_uri()
 *
 */

(function ($) {
	$(document).ready(function () {
		var $html = $('html');
		window.application = new Tc.Application($html);
		application.registerModules($html);
		application.registerModule($html, 'Layout');
		application.start();
		console.log('Terrific JS started');
	});
})(Tc.$);
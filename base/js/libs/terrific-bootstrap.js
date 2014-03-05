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
		application.config = {
			themeDir: '<?= get_template_directory_uri() ?>'
		};

		application.registerModules($html);
		application.start();
	});
})(Tc.$);
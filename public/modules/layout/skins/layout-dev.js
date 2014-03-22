(function () {

	'use strict';

	/**
	 * This Module is loaded only on the DEV Environment
	 * - see index.php: a body class skin-layout-dev is added there
	 * @param parent
	 * @constructor
	 */

	Tc.Module.Layout.Dev = function (parent) {

		this.on = function (callback) {

			/*
			 * Add Dev Badge to toggle Debug Mode
			 */

			var self = this,
				$ctx = this.$ctx,
				$devBadge = $('<div class="badge" title="Click for Debug Mode">Dev</div>');

			// Insert Debug Badge
			$ctx.prepend($devBadge);

			if ($ctx.hasClass('debug')) {
				$devBadge.toggleClass('active');
			}

			// Toggle Debug Mode
			$devBadge.on('click', function () {

				$devBadge.toggleClass('active');
				$ctx.toggleClass('debug');

				$.proxy(self.showTerrificModuleOutline(), self);
			});

			// call parent constructor
			parent.on(callback);
		};


		this.showTerrificModuleOutline = function () {

			var $ctx = this.$ctx;

			if($ctx.hasClass('debug')) {

				$('.mod:not(.mod-layout):visible').each(function () {

					var $this = $(this),
						position = $this.offset(),
						dimension = {
							height: $this.outerHeight(),
							width: $this.outerWidth()
						}, positioning = $this.css('position'),
						classes = $this.attr('class').split(' '),
						name = '';
					if (classes.length > 1) {
						for (var i = 0, len = classes.length; i < len; i++) {
							var part = $.trim(classes[i]);
							if (part.indexOf('mod') === 0 && part.length > 3) {
								name = part.substr(4);
							}
						}
					}
					if (positioning == 'static' || positioning == 'relative') {
						positioning = 'absolute';
					}

					var $overlay = $('<span class="terrific-module">' + name + '</span>').css({
						'zIndex': ($this.css('zIndex') + 1),
						'position': positioning,
						'width': dimension.width,
						'height': dimension.height,
						'top': position.top,
						'left': position.left
					});
					$('body').append($overlay);
				});
			} else {
				$('.terrific-module').remove();
			}
		};

	};

})(Tc.$);
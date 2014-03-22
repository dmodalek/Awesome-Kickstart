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

			// Insert debug badges into page
			this.addDebugBadges();

			// Activate a badge on page load
			this.activateBadge(window.location.hash);

			// call parent constructor
			parent.on(callback);
		};

		this.addDebugBadges = function () {

			var self = this,
				$ctx = this.$ctx,
				badgeNames = ['Grid', 'Mod', 'VA'];

			$.each(badgeNames, function (index, element) {

				var $badge = $('<a href="#' + element.toLowerCase() + '" class="badge badge-' + element.toLowerCase() + '">' + element + '</a>');
				$ctx.prepend($badge);

				$badge.on('click', function (e) {
					e.preventDefault();
					$badge.toggleClass('active');
					$ctx.toggleClass('debug-' + element.toLowerCase());
					self.setHash(element.toLowerCase());

					if (element == 'Mod') {
						$.proxy(self.addModOutline(), self);
					}
				});
			});
		};

		this.addModOutline = function () {

			var $ctx = this.$ctx;

			if ($ctx.hasClass('debug-mod')) {

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

		this.activateBadge = function(hash) {

			var type = hash.replace('#', ''),
				$badge = $('.badge-'+type, this.$ctx);

			$badge.trigger('click', 'pageload');
		};

		this.setHash= function(hash) {
			window.location.hash = hash;
		};
	};


})(Tc.$);
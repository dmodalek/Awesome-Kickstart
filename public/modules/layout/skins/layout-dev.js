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

			// Click on a badge
			this.onBadgeClick();

			// Activate a badge on page load
			this.activateBadges();

			// call parent constructor
			parent.on(callback);
		};

		///////////////////////////////////////////////////////////

		this.addDebugBadges = function () {

			var $ctx = this.$ctx,
				$badgeContainer = $('<div class="debug-badges"></div>'),
				badgeNames = ['Grid', 'Mod', 'VA'];

			$ctx.prepend($badgeContainer);

			$.each(badgeNames, function (index, element) {

				var $badge = $('<a href="#' + element.toLowerCase() + '" class="badge badge-' + element.toLowerCase() + '">' + element + '</a>');
				$badgeContainer.prepend($badge);
			});
		};

		this.onBadgeClick = function() {

			var self = this,

				$badges = $('.badge');

			$badges.on('click', function(e) {

				var $badge = $(e.target),
					type = $badge.attr('href').replace('#','');

				e.preventDefault();

				//
				$.proxy(self.toggleState($badge), self);

				// Toggle Hash
				self.toggleHash(type);
			});
		};

		this.activateBadges = function() {

			var self = this,
				$ctx = this.$ctx,
				currHash = window.location.hash,
				$badge,
				types;

			if(currHash.length !== 0) {

				types = currHash.replace('#','').split('+');

				$.each(types, function(index, type) {
					$badge = $('.badge-'+type, $ctx);
					self.toggleState($badge);
				});
			}
		};

		///////////////////////////////////////////////////////////

		this.toggleState = function($badge) {

			var $ctx = this.$ctx,
				type = $badge.attr('href').replace('#','');

			// Toggle active class on badge
			$badge.toggleClass('active');

			// Toggle debug-type class on body
			$ctx.toggleClass('debug-' + type );

			// If type = mod: Execute JS
			if (type == 'mod') {
				this.addModOutline();
			}
		};

		this.toggleHash = function(type) {

			var currHash = window.location.hash,
				newHash;

			// Add Hash
			if(currHash.indexOf(type) === -1) {

				if(currHash.length === 0) {
					newHash = type;
				} else {
					newHash = currHash + '+' + type;
				}

			// Remove Hash
			} else {

				var pos = currHash.indexOf(type);

				if(currHash.charAt(pos-1) == '+') {
					newHash = currHash.replace('+' + type, '');
				}

				if(currHash.charAt(pos-1) == '#' && currHash.length !== type.length) {
					newHash = currHash.replace(type + '+', '');
				}

				if(currHash.charAt(pos-1) == '#' && currHash.length == type.length + 1) {
					newHash = '';
				}
			}

			window.location.hash = newHash;
		};

		///////////////////////////////////////////////////////////

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
	};


})(Tc.$);
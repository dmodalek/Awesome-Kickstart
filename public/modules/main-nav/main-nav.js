(function () {

	'use strict';

	Tc.Module.MainNav = Tc.Module.extend({

		init: function ($ctx, sandbox, modId) {

			// call parent constructor
			this._super($ctx, sandbox, modId);

			// Do stuff here
			//...

			var $mobileToggle = $('.mobile-toggle', this.$ctx);

		},

		on: function (callback) {

			// Do stuff here
			//...

			var $mobileToggle = $('.mobile-toggle', this.$ctx);

			$mobileToggle.on('click', this.onToggleMobileNav);

			// callback
			callback();
		},

		onToggleMobileNav: function (ev) {

			var $mobileToggle = $(ev.delegateTarget),
				$ctx = this.$ctx,
				$navList = $('.nav-list-l1', $ctx),
				$navHeight = $navList.outerHeight();

			$mobileToggle.toggleClass('active');

			if ($navList.css('display') !== 'none') {

				// Hide
				$navList
					.animate({
						height: 0
					}, 'easeInOutQuad', function () {

						$navList.css({
							'height': 'auto', 'overflow': 'hidden', 'display': 'none'
						});
					});

			} else {

				// Show
				$navList
					.css({
						'height': 0, 'overflow': 'hidden', 'display': 'block'
					})
					.animate({
						height: $navHeight
					}, 'easeInOutQuad');
			}
		}

	});

})(Tc.$);
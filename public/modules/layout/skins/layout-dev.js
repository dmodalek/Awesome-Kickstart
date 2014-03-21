(function () {

	'use strict';

	Tc.Module.Layout.Dev = function(parent) {

		this.on = function (callback) {

			/*
			 * Add Dev Badge to toggle Debug Mode
			 */

			var $ctx = this.$ctx,
				$devBadge = $('<div class="badge" title="Click for Debug Mode">Dev</div>');

			// Add Debug Badge
			this.$ctx.prepend($devBadge);

			// Toggle Debug Mode
			$devBadge.on('click', function() {

				$devBadge.toggleClass('active');
				$ctx.toggleClass('debug');
			});

			// call parent constructor
			parent.on(callback);
		};

		this.after = function () {

			// Do stuff here
			//...

			// callback
			parent.after();
		};

	};

})(Tc.$);
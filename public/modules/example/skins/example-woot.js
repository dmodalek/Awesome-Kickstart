(function () {

	'use strict';

	Tc.Module.Example.Woot = function(parent) {

		this.on = function (callback) {

			var self = this,
				$ctx = this.$ctx;

			// Do stuff here
			//...

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
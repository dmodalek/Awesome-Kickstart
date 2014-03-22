(function () {

	'use strict';

	Tc.Module.Layout = Tc.Module.extend({

		init: function ($ctx, sandbox, modId) {

			// call parent constructor
			this._super($ctx, sandbox, modId);

			// Do stuff here
			//...

		},

		on: function (callback) {

			console.log('Layout Module loaded');

			// callback
			callback();
		},

		after: function() {

		}

	});

})(Tc.$);
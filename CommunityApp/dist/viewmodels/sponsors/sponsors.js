System.register([], function (_export, _context) {
	"use strict";

	var Sponsors;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			_export("Sponsors", Sponsors = function () {
				function Sponsors() {
					var _this = this;

					_classCallCheck(this, Sponsors);

					this.message = "Sponsors";
					setTimeout(function () {
						return _this.message = "Changed after binding";
					}, 3000);
				}

				Sponsors.prototype.doSomething = function doSomething(message) {
					console.log(message);
				};

				return Sponsors;
			}());

			_export("Sponsors", Sponsors);
		}
	};
});
//# sourceMappingURL=sponsors.js.map

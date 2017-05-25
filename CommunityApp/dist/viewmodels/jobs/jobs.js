System.register(['aurelia-framework', 'services/dataRepository'], function (_export, _context) {
	"use strict";

	var inject, DataRepository, _dec, _class, Jobs;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_servicesDataRepository) {
			DataRepository = _servicesDataRepository.DataRepository;
		}],
		execute: function () {
			_export('Jobs', Jobs = (_dec = inject(DataRepository), _dec(_class = function () {
				function Jobs(dataRepository) {
					_classCallCheck(this, Jobs);

					this.dataRepository = dataRepository;
				}

				Jobs.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
					var _this = this;

					this.jobs = [];
					this.router = navigationInstruction.router;
					return this.dataRepository.getJobs().then(function (jobs) {
						_this.jobs = jobs;
					}).catch(function (reason) {
						return console.log('The DataRepository.getJobs() function failed with \'' + reason + '\'');
					});
				};

				Jobs.prototype.addJob = function addJob() {
					this.router.navigateToRoute("addJob");
				};

				return Jobs;
			}()) || _class));

			_export('Jobs', Jobs);
		}
	};
});
//# sourceMappingURL=jobs.js.map

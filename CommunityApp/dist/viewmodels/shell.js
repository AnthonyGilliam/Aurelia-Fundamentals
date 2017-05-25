System.register(['aurelia-framework', 'aurelia-event-aggregator', 'common/backgroundNotification'], function (_export, _context) {
	"use strict";

	var inject, PubSub, BackgroundNotification, _dec, _class, Shell;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaEventAggregator) {
			PubSub = _aureliaEventAggregator.EventAggregator;
		}, function (_commonBackgroundNotification) {
			BackgroundNotification = _commonBackgroundNotification.BackgroundNotification;
		}],
		execute: function () {
			_export('Shell', Shell = (_dec = inject(PubSub), _dec(_class = function () {
				function Shell(pubSub) {
					var _this = this;

					_classCallCheck(this, Shell);

					this.pubSub = pubSub;
					this.pubSub.subscribe(BackgroundNotification.received, function (time) {
						_this.notification = time;
					});
				}

				Shell.prototype.clearNotification = function clearNotification() {
					this.notification = null;
				};

				Shell.prototype.configureRouter = function configureRouter(config, router) {
					this.router = router;
					config.title = "Capital Area .NET User Group";
					config.map([{ route: ['/', 'events'], moduleId: 'viewmodels/events/events', name: 'events', title: 'Events', nav: true }, { route: 'jobs', moduleId: 'viewmodels/jobs/jobs', name: 'jobs', title: 'Jobs', nav: true }, { route: 'addJob', moduleId: 'viewmodels/jobs/addJob', name: 'addJob' }, { route: 'discussion', moduleId: 'viewmodels/discussion/discussion', name: 'discussion', title: 'Discussion',
						nav: true }, { route: 'eventDetail/:eventId', moduleId: 'viewmodels/events/eventDetail', name: 'eventDetail' }]);
				};

				return Shell;
			}()) || _class));

			_export('Shell', Shell);
		}
	};
});
//# sourceMappingURL=shell.js.map

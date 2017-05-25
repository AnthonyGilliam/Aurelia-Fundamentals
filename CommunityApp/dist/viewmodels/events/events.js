System.register(['aurelia-framework', 'aurelia-router', 'services/dataRepository'], function (_export, _context) {
    "use strict";

    var inject, Router, DataRepository, _dec, _class, Events;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_servicesDataRepository) {
            DataRepository = _servicesDataRepository.DataRepository;
        }],
        execute: function () {
            _export('Events', Events = (_dec = inject(DataRepository, Router), _dec(_class = function () {
                function Events(repo, router) {
                    _classCallCheck(this, Events);

                    this.repo = repo;
                    this.router = router;
                }

                Events.prototype.goToDiscussion = function goToDiscussion() {
                    this.router.navigate('#/discussion');
                };

                Events.prototype.goToEvent = function goToEvent() {
                    this.router.navigateToRoute('eventDetail', { eventId: this.events[0].id });
                };

                Events.prototype.activate = function activate(params) {
                    var _this = this;

                    this.repo.getEvents().then(function (events) {
                        if (params.speaker || params.topic) {
                            var filteredResults = [];
                            events.forEach(function (event) {
                                if (params.speaker && event.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) >= 0) {
                                    filteredResults.push(event);
                                }
                                if (params.topic && event.title.toLowerCase().indexOf(params.topic.toLowerCase()) >= 0) {
                                    filteredResults.push(event);
                                }
                            });
                            _this.events = filteredResults;
                        } else {
                            _this.events = events;
                        }

                        _this.events.forEach(function (event) {
                            return event.detailUrl = _this.router.generate('eventDetail', { eventId: event.id });
                        });
                    });
                };

                return Events;
            }()) || _class));

            _export('Events', Events);
        }
    };
});
//# sourceMappingURL=events.js.map

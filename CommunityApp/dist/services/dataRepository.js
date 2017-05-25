System.register(['aurelia-framework', 'aurelia-http-client', 'aurelia-fetch-client', 'aurelia-event-aggregator', 'common/backgroundNotification', 'services/jobsData', 'moment'], function (_export, _context) {
    "use strict";

    var inject, AjaxClient, FetchClient, json, PubSub, BackgroundNotification, states, jobTypes, jobSkills, moment, _createClass, _dec, _class, _events, DataRepository;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaHttpClient) {
            AjaxClient = _aureliaHttpClient.HttpClient;
        }, function (_aureliaFetchClient) {
            FetchClient = _aureliaFetchClient.HttpClient;
            json = _aureliaFetchClient.json;
        }, function (_aureliaEventAggregator) {
            PubSub = _aureliaEventAggregator.EventAggregator;
        }, function (_commonBackgroundNotification) {
            BackgroundNotification = _commonBackgroundNotification.BackgroundNotification;
        }, function (_servicesJobsData) {
            states = _servicesJobsData.states;
            jobTypes = _servicesJobsData.jobTypes;
            jobSkills = _servicesJobsData.jobSkills;
        }, function (_moment) {
            moment = _moment.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _events = undefined;

            _export('DataRepository', DataRepository = (_dec = inject('apiRoot', AjaxClient, FetchClient, PubSub), _dec(_class = function () {
                function DataRepository(apiRoot, ajaxClient, fetchClient, pubSub) {
                    _classCallCheck(this, DataRepository);

                    this.apiRoot = apiRoot;
                    this.ajaxClient = ajaxClient;
                    this.fetchClient = fetchClient;
                    this.pubSub = pubSub;
                    setTimeout(function () {
                        return pubSub.publish(BackgroundNotification.received, moment().format('HH:mm:ss'));
                    }, 5000);
                    this.pubSub.subscribe(BackgroundNotification.received, function (time) {
                        console.info('Background Notification received on ' + time);
                    });
                }

                DataRepository.prototype.getEvents = function getEvents() {
                    return this.events;
                };

                DataRepository.prototype.getEvent = function getEvent(id) {
                    return this.events.then(function (events) {
                        return events.find(function (event) {
                            return event.id === id;
                        });
                    }).catch(function (reason) {
                        return console.log('The DataRepository.getEvent(' + id + ') function failed with ' + reason);
                    });
                };

                DataRepository.prototype.getJobs = function getJobs() {
                    var _this = this;

                    var promise = new Promise(function (resolve, reject) {
                        _this.fetchClient.fetch(_this.apiRoot + 'api/Jobs').then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            var jobs = data || [];
                            resolve(jobs);
                        }).catch(function (reason) {
                            reject(reason);
                        });
                    });
                    return promise;
                };

                DataRepository.prototype.addJob = function addJob(job) {
                    var _this2 = this;

                    var promise = new Promise(function (resolve, reject) {
                        _this2.fetchClient.fetch(_this2.apiRoot + 'api/Jobs', { method: 'POST', body: json(job) }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            return resolve(data);
                        }).catch(function (reason) {
                            return reject(reason);
                        });
                    });
                    return promise;
                };

                DataRepository.prototype.getStates = function getStates() {
                    var _this3 = this;

                    var promise = new Promise(function (resolve) {
                        if (!_this3.states) {
                            _this3.states = states;
                        }
                        resolve(_this3.states);
                    });
                    return promise;
                };

                DataRepository.prototype.getJobTypes = function getJobTypes() {
                    var _this4 = this;

                    var promise = new Promise(function (resolve) {
                        if (!_this4.jobTypes) {
                            _this4.jobTypes = jobTypes;
                        }
                        resolve(_this4.jobTypes);
                    });
                    return promise;
                };

                DataRepository.prototype.getJobSkills = function getJobSkills() {
                    var _this5 = this;

                    var promise = new Promise(function (resolve) {
                        if (!_this5.jobSkills) {
                            _this5.jobSkills = jobSkills;
                        }
                        resolve(_this5.jobSkills);
                    });
                    return promise;
                };

                _createClass(DataRepository, [{
                    key: 'events',
                    get: function get() {
                        var _this6 = this;

                        return new Promise(function (resolve, reject) {
                            if (_events) {
                                resolve(_events);
                            } else {
                                _this6.ajaxClient.get(_this6.apiRoot + 'api/events').then(function (response) {
                                    var data = response.responseType === 'json' ? response.content : JSON.parse(response.content);
                                    _events = data.sort(function (a, b) {
                                        return a.dateTime >= b.dateTime ? 1 : -1;
                                    });
                                    _events.forEach(function (item) {
                                        return item.isMvp = item.speaker === "Brian Noyes";
                                    });
                                    resolve(_events);
                                }).catch(function (reason) {
                                    return reject(reason);
                                });
                            }
                        });
                    },
                    set: function set(value) {
                        _events = value;
                    }
                }]);

                return DataRepository;
            }()) || _class));

            _export('DataRepository', DataRepository);
        }
    };
});
//# sourceMappingURL=dataRepository.js.map

System.register(['aurelia-framework', 'services/dataRepository', 'aurelia-dialog', 'viewmodels/events/EditDialog'], function (_export, _context) {
    "use strict";

    var inject, DataRepository, DialogService, EditDialog, _dec, _class, EventDetail;

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
        }, function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }, function (_viewmodelsEventsEditDialog) {
            EditDialog = _viewmodelsEventsEditDialog.EditDialog;
        }],
        execute: function () {
            _export('EventDetail', EventDetail = (_dec = inject(DataRepository, DialogService), _dec(_class = function () {
                function EventDetail(dataRepo, dialogService) {
                    _classCallCheck(this, EventDetail);

                    this.dataRepo = dataRepo;
                    this.dialogService = dialogService;
                }

                EventDetail.prototype.activate = function activate(params) {
                    var _this = this;

                    this.dataRepo.getEvent(parseInt(params.eventId)).then(function (event) {
                        return _this.event = event;
                    });
                };

                EventDetail.prototype.editEvent = function editEvent(event) {
                    var _this2 = this;

                    var original = JSON.parse(JSON.stringify(event));
                    this.dialogService.open({ viewModel: EditDialog, model: this.event }).then(function (result) {
                        if (result.wasCancelled) {
                            _this2.event.title = original.title;
                            _this2.event.description = original.description;
                        }
                        alert(result.output);
                    });
                };

                return EventDetail;
            }()) || _class));

            _export('EventDetail', EventDetail);
        }
    };
});
//# sourceMappingURL=eventDetail.js.map

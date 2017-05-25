System.register(['aurelia-framework', 'aurelia-dialog'], function (_export, _context) {
    "use strict";

    var inject, DialogController, _dec, _class, EditDialog;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaDialog) {
            DialogController = _aureliaDialog.DialogController;
        }],
        execute: function () {
            _export('EditDialog', EditDialog = (_dec = inject(DialogController), _dec(_class = function () {
                function EditDialog(dialogController) {
                    _classCallCheck(this, EditDialog);

                    this.dialog = dialogController;
                }

                EditDialog.prototype.activate = function activate(event) {
                    this.event = event;
                };

                EditDialog.prototype.save = function save() {
                    this.dialog.ok('saved!');
                };

                EditDialog.prototype.cancel = function cancel() {
                    this.dialog.cancel('cancelled :\'(');
                };

                return EditDialog;
            }()) || _class));

            _export('EditDialog', EditDialog);
        }
    };
});
//# sourceMappingURL=editDialog.js.map

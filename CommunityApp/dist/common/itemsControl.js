System.register(['aurelia-framework'], function (_export, _context) {
    "use strict";

    var BoundViewFactory, ViewSlot, customAttribute, templateController, inject, _dec, _dec2, _class, ItemsController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            BoundViewFactory = _aureliaFramework.BoundViewFactory;
            ViewSlot = _aureliaFramework.ViewSlot;
            customAttribute = _aureliaFramework.customAttribute;
            templateController = _aureliaFramework.templateController;
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export('ItemsController', ItemsController = (_dec = customAttribute('items-control'), _dec2 = inject(BoundViewFactory, ViewSlot), _dec(_class = templateController(_class = _dec2(_class = function () {
                function ItemsController(boundViewFactory, viewSlot) {
                    _classCallCheck(this, ItemsController);

                    this.viewFactory = boundViewFactory;
                    this.viewSlot = viewSlot;
                    this.viewInstances = [];
                }

                ItemsController.prototype.valueChanged = function valueChanged(newValue) {
                    var _this = this;

                    this.viewInstances.forEach(function (view) {
                        _this.viewSlot.remove(view);
                        view.unbind();
                    });
                    this.viewInstances = [];
                    newValue.forEach(function (value) {
                        var view = _this.viewFactory.create();
                        view.bind(value);
                        _this.viewSlot.add(view);
                    });
                };

                return ItemsController;
            }()) || _class) || _class) || _class));

            _export('ItemsController', ItemsController);
        }
    };
});
//# sourceMappingURL=itemsControl.js.map

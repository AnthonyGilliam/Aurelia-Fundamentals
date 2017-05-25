System.register(['aurelia-validation'], function (_export, _context) {
    "use strict";

    var ValidationRenderer, RenderInstruction, ValidationError, BootstrapFormRenderer;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaValidation) {
            ValidationRenderer = _aureliaValidation.ValidationRenderer;
            RenderInstruction = _aureliaValidation.RenderInstruction;
            ValidationError = _aureliaValidation.ValidationError;
        }],
        execute: function () {
            _export('BootstrapFormRenderer', BootstrapFormRenderer = function () {
                function BootstrapFormRenderer() {
                    _classCallCheck(this, BootstrapFormRenderer);

                    this.anyErrors = function (nodeList) {
                        var text = [];
                        nodeList.forEach(function (node) {
                            return text.push(node.innerText);
                        });
                        return text;
                    };
                }

                BootstrapFormRenderer.prototype.render = function render(instruction) {
                    for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref2 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref2 = _i.value;
                        }

                        var _ref5 = _ref2;
                        var result = _ref5.result,
                            elements = _ref5.elements;

                        for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                            var _ref6;

                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref6 = _iterator3[_i3++];
                            } else {
                                _i3 = _iterator3.next();
                                if (_i3.done) break;
                                _ref6 = _i3.value;
                            }

                            var element = _ref6;

                            this.remove(element, result);
                        }
                    }

                    for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref4;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref4 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref4 = _i2.value;
                        }

                        var _ref7 = _ref4;
                        var result = _ref7.result,
                            elements = _ref7.elements;

                        for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                            var _ref8;

                            if (_isArray4) {
                                if (_i4 >= _iterator4.length) break;
                                _ref8 = _iterator4[_i4++];
                            } else {
                                _i4 = _iterator4.next();
                                if (_i4.done) break;
                                _ref8 = _i4.value;
                            }

                            var _element = _ref8;

                            this.add(_element, result);
                        }
                    }
                };

                BootstrapFormRenderer.prototype.add = function add(element, error) {
                    var formGroup = element.closest('.form-group');
                    if (!formGroup) {
                        return;
                    }

                    var message = document.createElement('span');
                    message.className = 'help-block validation-message';
                    message.textContent = error.message;
                    message.id = 'validation-message-' + error.id;
                    formGroup.appendChild(message);

                    if (error.message) formGroup.classList.add('has-error');
                };

                BootstrapFormRenderer.prototype.remove = function remove(element, error) {
                    var formGroup = element.closest('.form-group');
                    if (!formGroup) {
                        return;
                    }

                    var message = formGroup.querySelector('#validation-message-' + error.id);
                    if (message) {
                        formGroup.removeChild(message);

                        var errors = formGroup.querySelectorAll('.help-block.validation-message');
                        var errorText = this.anyErrors(errors);
                        if (errors.length === 0 || !errorText) {
                            formGroup.classList.remove('has-error');
                        }
                    }
                };

                return BootstrapFormRenderer;
            }());

            _export('BootstrapFormRenderer', BootstrapFormRenderer);
        }
    };
});
//# sourceMappingURL=bootstrap-form-renderer.js.map

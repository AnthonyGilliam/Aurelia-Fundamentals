System.register(['aurelia-framework'], function (_export, _context) {
    "use strict";

    var inject, customAttribute, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, SpeakerImage;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            customAttribute = _aureliaFramework.customAttribute;
            bindable = _aureliaFramework.bindable;
        }],
        execute: function () {
            _export('SpeakerImage', SpeakerImage = (_dec = inject(Element), _dec2 = customAttribute('speaker-img'), _dec(_class = _dec2(_class = (_class2 = function () {
                function SpeakerImage(element) {
                    _classCallCheck(this, SpeakerImage);

                    _initDefineProp(this, 'imageName', _descriptor, this);

                    _initDefineProp(this, 'isMvp', _descriptor2, this);

                    this.element = element;
                }

                SpeakerImage.prototype.imageNameChanged = function imageNameChanged(newValue) {
                    this.element.src = 'images/speakers/' + newValue;
                };

                SpeakerImage.prototype.isMvpChanged = function isMvpChanged(newValue) {
                    if (newValue) {
                        var el = document.createElement("div");
                        el.innerHTML = "MVP";
                        el.className = "watermark";
                        this.element.parentNode.insertBefore(el, this.element.nextSibling);
                    }
                };

                return SpeakerImage;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'imageName', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'isMvp', [bindable], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class) || _class));

            _export('SpeakerImage', SpeakerImage);
        }
    };
});
//# sourceMappingURL=speakerImage.js.map

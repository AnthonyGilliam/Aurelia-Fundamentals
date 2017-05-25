System.register([], function (_export, _context) {
    "use strict";

    var ImLazy;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("ImLazy", ImLazy = function () {
                function ImLazy() {
                    _classCallCheck(this, ImLazy);

                    console.log("ImLazy constructor");
                }

                ImLazy.prototype.doStuff = function doStuff() {
                    console.log("ImLazy but doing stuff");
                };

                return ImLazy;
            }());

            _export("ImLazy", ImLazy);
        }
    };
});
//# sourceMappingURL=imLazy.js.map

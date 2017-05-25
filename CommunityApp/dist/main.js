System.register(['bootstrap', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var ViewLocator;
    function configure(aurelia) {

        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-dialog').plugin('aurelia-validation');

        aurelia.use.instance("apiRoot", "http://brianapidemos.azurewebsites.net/CommunityApi/");
        aurelia.use.globalResources('common/date-format');

        ViewLocator.prototype.convertOriginToViewUrl = function (origin) {
            var viewModelUrl = origin.moduleId;
            var url = viewModelUrl.endsWith('.js') || viewModelUrl.endsWith('.ts') ? viewModelUrl.substring(0, viewModelUrl.length - 3) : viewModelUrl;
            return url.replace("viewmodels", "views") + '.html';
        };

        aurelia.start().then(function (au) {
            return au.setRoot("viewmodels/shell");
        });
    }

    _export('configure', configure);

    return {
        setters: [function (_bootstrap) {}, function (_aureliaFramework) {
            ViewLocator = _aureliaFramework.ViewLocator;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=main.js.map

import 'bootstrap';
import {ViewLocator} from 'aurelia-framework';
import {DataCache} from 'dataCache';

export function configure(aurelia) {
    //TODO: Create actual cache for queried data
    //let cache = new DataCache();

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-dialog');

    aurelia.use.instance("apiRoot", "http://localhost:27092/");

    ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
        let viewModelUrl = origin.moduleId;
        let url = (viewModelUrl.endsWith('.js') || viewModelUrl.endsWith('.ts'))
            ? viewModelUrl.substring(0, viewModelUrl.length - 3)
            : viewModelUrl;
        return url.replace("viewmodels", "views") + '.html';
    };

    aurelia.start().then(au => au.setRoot("viewmodels/shell"));
}
import 'bootstrap';
import {ViewLocator} from 'aurelia-framework';
import {DataCache} from 'dataCache';

export function configure(aurelia) {
    let cache = new DataCache();
    cache.data.push(`obj 0`);
    cache.data.push(`obj 1`);
    cache.data.push(`obj 2`);
    aurelia.use.instance("Cache", cache);
    aurelia.use.instance("apiRoot", "http://localhost:27092/");

    aurelia.use.standardConfiguration().developmentLogging();

    ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
        let viewModelUrl = origin.moduleId;
        let url = (viewModelUrl.endsWith('.js') || viewModelUrl.endsWith('.ts'))
            ? viewModelUrl.substring(0, viewModelUrl.length - 3)
            : viewModelUrl;
        return url.replace("viewmodels", "views") + '.html';
    };

    aurelia.start().then(au => au.setRoot("viewmodels/shell"));
}
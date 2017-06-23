export class Events {
    configureRouter(config, router) {
        this.router = router;
        config.title = 'Events';
        config.map([
            { route: ['', 'future'], moduleId: 'viewmodels/events/eventsList', title: 'Future Events', nav: true,
                //Use '#' in route only when NOT using PushState to normalize addresses
                href: '/events/future', name: 'future' },
            /*{ route: ['past'], moduleId: 'viewmodels/events/past', title: 'Past Events', nav: true,
                href: '#/events/past' }*/
            //Mapping route using Activation Strategy:
            { route: ['past'], moduleId: 'viewmodels/events/eventsList', title: 'Past Events', nav: true,
                //Use '#' in route only when NOT using PushState to normalize addresses
                href: '/events/past', name: 'past' }
        ]);
    }
}
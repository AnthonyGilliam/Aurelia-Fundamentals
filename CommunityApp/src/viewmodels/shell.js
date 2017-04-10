export class Shell {
	constructor() {
	}

	configureRouter(config, router) {
		this.router = router;
		config.title = "Capital Area .NET User Group";
		config.map([/* '/' defines the default route used in the shell */
			{ route: ['/', 'events'], moduleId: 'viewmodels/events/events', name: 'events', title: 'Events', nav: true },
			{ route: 'jobs', moduleId: 'viewmodels/jobs/jobs', name: 'jobs', title: 'Jobs', nav: true },
			{ route: 'discussion', moduleId: 'viewmodels/discussion/discussion', name: 'discussion', title: 'Discussion'
				, nav: true },
			{ route: 'eventDetail/:eventId', moduleId: 'viewmodels/events/eventDetail', name: 'eventDetail' }
		]);
	}
}
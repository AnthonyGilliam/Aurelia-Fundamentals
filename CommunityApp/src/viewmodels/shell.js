import {inject} from 'aurelia-framework';
import {EventAggregator as PubSub} from 'aurelia-event-aggregator';
import {BackgroundNotification} from 'common/backgroundNotification';
import toastr from 'toastr';
import moment from 'moment';

@inject(PubSub)
export class Shell {
	constructor(pubSub) {
		this.pubSub = pubSub;
		this.pubSub.subscribe(BackgroundNotification.received, time => {
			this.notification = time;
		});
		setInterval(() => this.timeIs = moment().format("hh:mm:ss.SSS"), 100);
		this.throttleInterval = 1000
	}

	clearNotification() {
		this.notification = null;
	}

	configureRouter(config, router) {
		this.router = router;
		config.title = "Capital Area .NET User Group";
        config.options.pushState = true;
        config.options.root = '/';
        config.addPipelineStep('authorize', TriggerLoadingStep);
        config.addPipelineStep('authorize', LogNextStep);
        config.addPipelineStep('authorize', NavToastStep);
        config.addPipelineStep('preActivate', LogNextStep);
        config.addPipelineStep('preActivate', NavToastStep);
        config.addPipelineStep('preRender', LogNextStep);
        config.addPipelineStep('preRender', NavToastStep);
        config.addPipelineStep('postRender', LogNextStep);
        config.addPipelineStep('postRender', NavToastStep);
		config.map([/* '/' defines the default route used in the shell */
			{ route: ['/', 'events'], name: 'events', title: 'Events', nav: true,
				viewPorts: {
					mainContent: { moduleId: 'viewmodels/events/events' },
					sideBar: { moduleId: 'viewmodels/sideBar/sponsors' },
				}
			},
			{ route: 'jobs', name: 'jobs', title: 'Jobs', nav: true,
                viewPorts: {
                    mainContent: { moduleId: 'viewmodels/jobs/jobs' },
                    sideBar: { moduleId: 'viewmodels/sideBar/sponsors' },
                }
            },
			{ route: 'addJob', name: 'addJob',
                viewPorts: {
                    mainContent: { moduleId: 'viewmodels/jobs/addJob' },
                    sideBar: { moduleId: 'viewmodels/sideBar/ads' },
                }
			},
			{ route: 'discussion', name: 'discussion', title: 'Discussion', nav: true,
                viewPorts: {
                    mainContent: { moduleId: 'viewmodels/discussion/discussion' },
                    sideBar: { moduleId: 'viewmodels/sideBar/ads' },
                }
			},
			{ route: 'eventDetail/:eventId', name: 'eventDetail',
                viewPorts: {
                    mainContent: { moduleId: 'viewmodels/events/eventDetail' },
                    sideBar: { moduleId: 'viewmodels/sideBar/ads' },
                }
			}
		]);
	}
}

@inject(PubSub)
class TriggerLoadingStep {
    constructor(pubSub){
        this.pubSub = pubSub;
    }
    run(navigationInstruction, next) {
        this.pubSub.publish('Loading/Init', navigationInstruction.router);
        return next().then(result => {
            this.pubSub.publish('Loading/Done');
            return result;
        });
    }
}

class LogNextStep {
	run(navigationInstruction, next) {
		return next().then(result => {
			//Next step and ALL downstream steps are complete
			console.log(JSON.stringify(result));
			return result;
		});
	}
}

class NavToastStep {
    run(navigationInstruction, next) {
        return next().then(result => {
            if(result.status === 'canceled')
                toastr.error(`Navigation cancelled`);
            return result;
        });
    }
}
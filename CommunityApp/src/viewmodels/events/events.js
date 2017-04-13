import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {DataRepository} from 'services/dataRepository';

@inject(DataRepository, Router)
export class Events {
	constructor(repo, router) {
		this.repo = repo;
		this.router = router;
	}

    goToDiscussion(){
		this.router.navigate('#/discussion');
    }

    goToEvent(){
		this.router.navigateToRoute('eventDetail', { eventId: this.events[0].id });
    }

	activate(params) {
        this.repo.getEvents().then(events => {
            if(params.speaker || params.topic) {
            	var filteredResults = [];
            	events.forEach(event => {
            		if(params.speaker && event.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) >= 0) {
            			filteredResults.push(event);
					}
					if(params.topic && event.title.toLowerCase().indexOf(params.topic.toLowerCase()) >= 0) {
            			filteredResults.push(event);
					}
				});
            	this.events = filteredResults;
			} else {
                this.events = events;
			}

            this.events.forEach(event =>
                event.detailUrl = this.router.generate('eventDetail', { eventId: event.id })
            )
        });
	}
}
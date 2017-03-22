import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';

@inject(DataRepository)
export class EventDetail {
    constructor(dataRepo){
        this.dataRepo = dataRepo;
    }

    activate(params){
        this.dataRepo.getEvent(parseInt(params.eventId)).then(event => this.event = event );
    }
}
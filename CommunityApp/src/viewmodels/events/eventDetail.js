import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';
import {DialogService} from 'aurelia-dialog';
import {EditDialog} from 'viewmodels/events/EditDialog';

@inject(DataRepository, DialogService)
export class EventDetail {
    constructor(dataRepo, dialogService){
        this.dataRepo = dataRepo;
        this.dialogService = dialogService;
    }

    activate(params){
        this.dataRepo.getEvent(parseInt(params.eventId)).then(event => this.event = event );
    }

    editEvent(event) {
        var original = JSON.parse(JSON.stringify(event));
        this.dialogService.open({viewModel: EditDialog, model: this.event})
            .then(result => {
                if(result.wasCancelled) {
                    this.event.title = original.title;
                    this.event.description = original.description;
                }
                alert(result.output);
            });
    }
}
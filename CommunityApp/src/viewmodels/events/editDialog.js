import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class EditDialog {
    constructor(dialogController){
        this.dialog = dialogController;
    }

    activate(event){
        this.event = event;
    }

    save(){
        this.dialog.ok('saved!');
    }

    cancel(){
        this.dialog.cancel('cancelled :\'(');
    }
}
import {inject, bindable} from 'aurelia-framework';

export class event {
    activate(model){
        this.event = model.event;
        this.parent = model.parent;
    }

    favEventSelected(event){
        this.parent.favoriteEvent = event;
        console.log(`Favorite event is : ${this.parent.favoriteEvent.id}`);
    }
}
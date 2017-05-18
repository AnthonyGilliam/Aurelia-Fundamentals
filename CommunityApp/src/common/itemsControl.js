import {BoundViewFactory, ViewSlot, customAttribute, templateController, inject} from 'aurelia-framework';

@customAttribute('items-control')
@templateController
@inject(BoundViewFactory, ViewSlot)
export class ItemsController {
    constructor(boundViewFactory, viewSlot) {
        this.viewFactory = boundViewFactory;
        this.viewSlot = viewSlot;
        this.viewInstances = [];
    }

    ///Gets passed an array of items which causes all the old items to be removed and replaced with given newValue
    valueChanged(newValue) {
        this.viewInstances.forEach(view => {
            this.viewSlot.remove(view);
            view.unbind();
        });
        this.viewInstances = [];
        newValue.forEach(value => {
            let view = this.viewFactory.create();
            view.bind(value);
            this.viewSlot.add(view);
        });
    }
}
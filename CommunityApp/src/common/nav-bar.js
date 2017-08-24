import {containerless, bindable, inject} from 'aurelia-framework';
import {EventAggregator as PubSub} from 'aurelia-event-aggregator';

@containerless()
@inject(PubSub)
export class NavBar {
    @bindable router;

    constructor(pubSub){
        this.showLoading = false;
        pubSub.subscribe('Loading/Init', router =>
            setTimeout(_ =>
                this.showLoading = router.isNavigating
                , 1000)
        );
        pubSub.subscribe('Loading/Done', _ =>
            this.showLoading = false
        );
    }

    created(view){

    }

    bind(bindingContext, overrideContext){

    }

    unbind(){

    }

    attached(){

    }

    detached(){

    }
}
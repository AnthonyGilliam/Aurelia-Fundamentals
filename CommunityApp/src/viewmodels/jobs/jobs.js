import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';

@inject(DataRepository)
export class Jobs {
	constructor(dataRepository) {
		this.dataRepository = dataRepository;
	}

    canActivate(params, routeConfig, navigationInstruction) {
    	//Deliberation based on database results
		//...
		return new Promise((resolve) => {
    		setTimeout(_ => {
    			resolve(true);
    		}, 3000);
    	});
    }

	activate(params, routeConfig, navigationInstruction) {
		this.jobs = [];
		this.router = navigationInstruction.router;
		return this.dataRepository.getJobs()
			.then(jobs => {
				this.jobs = jobs;
			})
			.catch(reason =>
                console.log(`The DataRepository.getJobs() function failed with '${reason}'`)
			);
	}

	addJob() {
		this.router.navigateToRoute("addJob");
	}

}
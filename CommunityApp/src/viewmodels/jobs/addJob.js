import {inject} from 'aurelia-framework';
import {ValidationRules, ValidationController} from 'aurelia-validation';
import {DataRepository} from 'services/dataRepository';

@inject(DataRepository, ValidationController)
export class AddJob {
	constructor(dataRepository, valController) {
		dataRepository.getStates().then(states=> {
			this.states = states;
		});
		dataRepository.getJobTypes().then(jobTypes => {
			this.jobTypes = jobTypes;
		});
		dataRepository.getJobSkills().then(jobSkills => {
			this.jobSkills = jobSkills;
		});
        this.dataRepository = dataRepository;
        this.valController = valController;
        this.job = { jobType: "Full Time", jobSkills: []};
	}

	activate(params, routeConfig, navigationInstruction) {
		this.router = navigationInstruction.router;
	}

	save() {
		if (this.job.needDate) {
		this.job.needDate = new Date(this.job.needDate);
		}
		this.dataRepository.addJob(this.job).then(job=> this.router.navigateToRoute('jobs'));
	}


}
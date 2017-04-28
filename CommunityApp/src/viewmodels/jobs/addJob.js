import {inject} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {DataRepository} from 'services/dataRepository';
import {BootstrapFormRenderer} from 'bootstrap-form-renderer'

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
        this.valController.validateTrigger = validateTrigger.changeOrBlur;
        this.valController.addRenderer(new BootstrapFormRenderer());
        this.job = { jobType: "Full Time", jobSkills: []};
        ValidationRules.customRule(
            'notCEO',
            (value, object) => value !== 'CEO',
            `nice try, \${$displayName} cannot be \${$value}`
        );
		ValidationRules
			.ensure(j => j.title)
			.required()
			.minLength(3)
            .satisfiesRule('notCEO')
			.on(this.job);
	}

	activate(params, routeConfig, navigationInstruction) {
		this.router = navigationInstruction.router;
	}

	save() {
		if(this.valController.errors && this.valController.errors.length > 0) {
         	alert('FIX THE ERRORS ON THE FORM!')
            return; //There are validation errors in the form
        }
		if (this.job.needDate) {
			this.job.needDate = new Date(this.job.needDate);
		}
		this.dataRepository.addJob(this.job).then(job=> this.router.navigateToRoute('jobs'));
	}
}
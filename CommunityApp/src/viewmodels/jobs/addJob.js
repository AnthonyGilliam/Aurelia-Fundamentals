import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {DataRepository} from 'services/dataRepository';
import {BootstrapFormRenderer} from 'common/bootstrap-form-renderer';

@inject(DataRepository, NewInstance.of(ValidationController))
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
            `nice try, \${$displayName} cannot be \${$value}.`
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

	inputChanged(element){
        console.log(`Element ID is: ${element.id}\nElement name is: ${element.name}`);
    }

	save() {
		this.valController.validate()
			.then(result => {
                if (!result.valid) {
                    let errors = result.results
                        .reduce((sum, next) => sum += next.valid ? '' : (next.message.slice(0, -1) + ", "), '')
						.slice(0, -2);
                    console.info(`Validation errors while submitting addJobs form: ${errors}`);
                    return; //There are validation errors in the form
                }
                if (this.job.needDate) {
                    this.job.needDate = new Date(this.job.needDate);
                }
                this.dataRepository.addJob(this.job).then(job => this.router.navigateToRoute('jobs'));
            })
			.catch(reason => alert(reason));
	}
}
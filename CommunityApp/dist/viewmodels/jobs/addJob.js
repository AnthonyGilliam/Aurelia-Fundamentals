System.register(['aurelia-framework', 'aurelia-validation', 'services/dataRepository', 'common/bootstrap-form-renderer'], function (_export, _context) {
  "use strict";

  var inject, NewInstance, ValidationRules, ValidationController, validateTrigger, DataRepository, BootstrapFormRenderer, _dec, _class, AddJob;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      NewInstance = _aureliaFramework.NewInstance;
    }, function (_aureliaValidation) {
      ValidationRules = _aureliaValidation.ValidationRules;
      ValidationController = _aureliaValidation.ValidationController;
      validateTrigger = _aureliaValidation.validateTrigger;
    }, function (_servicesDataRepository) {
      DataRepository = _servicesDataRepository.DataRepository;
    }, function (_commonBootstrapFormRenderer) {
      BootstrapFormRenderer = _commonBootstrapFormRenderer.BootstrapFormRenderer;
    }],
    execute: function () {
      _export('AddJob', AddJob = (_dec = inject(DataRepository, NewInstance.of(ValidationController)), _dec(_class = function () {
        function AddJob(dataRepository, valController) {
          var _this = this;

          _classCallCheck(this, AddJob);

          dataRepository.getStates().then(function (states) {
            _this.states = states;
          });
          dataRepository.getJobTypes().then(function (jobTypes) {
            _this.jobTypes = jobTypes;
          });
          dataRepository.getJobSkills().then(function (jobSkills) {
            _this.jobSkills = jobSkills;
          });
          this.dataRepository = dataRepository;
          this.valController = valController;
          this.valController.validateTrigger = validateTrigger.changeOrBlur;
          this.valController.addRenderer(new BootstrapFormRenderer());
          this.job = { jobType: "Full Time", jobSkills: [] };
          ValidationRules.customRule('notCEO', function (value, object) {
            return value !== 'CEO';
          }, 'nice try, ${$displayName} cannot be ${$value}.');
          ValidationRules.ensure(function (j) {
            return j.title;
          }).required().minLength(3).satisfiesRule('notCEO').on(this.job);
        }

        AddJob.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
          this.router = navigationInstruction.router;
        };

        AddJob.prototype.save = function save() {
          var _this2 = this;

          this.valController.validate().then(function (result) {
            if (!result.valid) {
              var errors = result.results.reduce(function (sum, next) {
                return sum += next.valid ? '' : next.message.slice(0, -1) + ", ";
              }, '').slice(0, -2);
              console.info('Validation errors while submitting addJobs form: ' + errors);
              return;
            }
            if (_this2.job.needDate) {
              _this2.job.needDate = new Date(_this2.job.needDate);
            }
            _this2.dataRepository.addJob(_this2.job).then(function (job) {
              return _this2.router.navigateToRoute('jobs');
            });
          }).catch(function (reason) {
            return alert(reason);
          });
        };

        return AddJob;
      }()) || _class));

      _export('AddJob', AddJob);
    }
  };
});
//# sourceMappingURL=addJob.js.map

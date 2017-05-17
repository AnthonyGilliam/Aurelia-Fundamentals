import {inject} from 'aurelia-framework';
import {HttpClient as AjaxClient} from 'aurelia-http-client';
import {HttpClient as FetchClient, json} from 'aurelia-fetch-client';
import {EventAggregator as PubSub} from 'aurelia-event-aggregator';
import {BackgroundNotification} from 'common/backgroundNotification';
import {states, jobTypes, jobSkills} from 'services/jobsData';
import moment from 'moment';

let _events = undefined;

@inject('apiRoot', AjaxClient, FetchClient, PubSub)
export class DataRepository {
    constructor(apiRoot, ajaxClient, fetchClient, pubSub){
        this.apiRoot = apiRoot;
        this.ajaxClient = ajaxClient;
        this.fetchClient = fetchClient;
        this.pubSub = pubSub;
        setTimeout(() =>
                pubSub.publish(BackgroundNotification.received, moment().format('HH:mm:ss'))
                , 5000);
        this.pubSub.subscribe(BackgroundNotification.received, time => {
            console.info(`Background Notification received on ${time}`);
        });
    }

    get events() {
        return new Promise((resolve, reject) => {
            if (_events) {
                resolve(_events);
            } else {
                this.ajaxClient.get(this.apiRoot + 'api/events')
                    .then(response => {
                        var data = JSON.parse(response.content);
                        _events = data
                            .sort((a,b) => a.dateTime >= b.dateTime ? 1 : -1)
                            .forEach(item => item.isMvp = item.name == "Brian Noyes" ? true : false);
                        resolve(_events);
                    })
                    .catch(reason => reject(reason));
            }
        });
    }
    set events(value){
        _events = value;
    }

    getEvents() {
        return this.events;
    }

    getEvent(id) {
        return this.events
            .then(events => events.find(event => event.id === id))
            .catch(reason => console.log(`The DataRepository.getEvent(${id}) function failed with ${reason}`));
    }

    getJobs() {
        let promise = new Promise((resolve, reject) => {
            this.fetchClient.fetch(this.apiRoot + 'api/Jobs')
                .then(response => response.json())
                .then(data => {
                    let jobs = data || [];
                    resolve(jobs);
                })
                .catch(reason => {
                    reject(reason)
                });
        });
        return promise;
    }

    addJob(job) {
        let promise = new Promise((resolve, reject) => {
            this.fetchClient.fetch(this.apiRoot + 'api/Jobs', { method: 'POST', body: json(job) })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(reason => reject(reason));
        });
        return promise;
    }

    getStates() {
        var promise = new Promise((resolve) => {
            if (!this.states) {
                this.states = states;
            }
            resolve(this.states);
        });
        return promise;
    }

    getJobTypes() {
        var promise = new Promise((resolve) => {
            if (!this.jobTypes) {
                this.jobTypes = jobTypes;
            }
            resolve(this.jobTypes);
        });
        return promise;
    }

    getJobSkills() {
        var promise = new Promise((resolve) => {
            if (!this.jobSkills) {
                this.jobSkills = jobSkills;
            }
            resolve(this.jobSkills);
        });
        return promise;
    }
}
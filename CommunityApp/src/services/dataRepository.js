import {inject} from 'aurelia-framework';
import {HttpClient as AjaxClient} from 'aurelia-http-client';
import {HttpClient as FetchClient, json} from 'aurelia-fetch-client';
import moment from 'moment';

let _events = undefined;

@inject('apiRoot', AjaxClient, FetchClient, json)
export class DataRepository {
    constructor(apiRoot, ajaxClient, fetchClient){
        this.apiRoot = apiRoot;
        this.ajaxClient = ajaxClient;
        this.fetchClient = fetchClient;
        this.json = json;
    }

    get events() {
        return new Promise((resolve, reject) => {
            if (_events) {
                resolve(_events);
            } else {
                this.ajaxClient.get(this.apiRoot + 'api/events')
                    .then(response => {
                        _events = response.content;
                        _events.forEach(event => {
                            event.dateime = moment(event.dateTime).format("MM/DD/YYYY HH:mm");
                            event.image = `images/speakers/${event.image}`;
                        });
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
            .catch(reason => console.log(`The DataRepository.getJobs() function failed with ${reason}`));
    }

    getJobs() {
        let promise = new Promise((resolve, reject) => {
            let jobs = [];
            this.fetchClient.fetch(this.apiRoot + 'api/Jobs')
                .then(response => response.json())
                .then(data => {
                    jobs = data;
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
    }
}
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {HttpClient as FetchClient} from 'aurelia-fetch-client';
import moment from 'moment';

let _events = undefined;

@inject('apiRoot', HttpClient, FetchClient)
export class DataRepository {
    constructor(httpClient, fetchClient, apiRoot){
        this.apiRoot = apiRoot;
        this.httpClient = httpClient;
        this.fetchClient = fetchClient;
    }

    get events() {
        return new Promise((resolve, reject) => {
            if (_events) {
                resolve(_events);
            } else {
                this.httpClient.get(`${this.apiRoot}api/events`)
                    .then(response => {
                        _events = response.content;
                        _events.forEach(event => {
                            event.dateime = moment(event.dateTime).format("MM/DD/YYYY HH:mm");
                            event.image = `images/speakers/${event.image}`;
                        });
                        resolve(_events);
                    })
                    .catch(response =>
                        reject(`${response.statusCode}: ${response.statusText}`)
                    );
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
        return this.events.then(events => events.find(event => event.id == id));
    }
}
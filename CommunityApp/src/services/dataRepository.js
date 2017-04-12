import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import moment from 'moment';

let _events = undefined;

@inject(HttpClient)
export class DataRepository {
    constructor(httpClient){
        this.httpClient = httpClient;
    }

    get events() {
        return new Promise((resolve, reject) => {
            if (_events) {
                resolve(_events);
            } else {
                this.httpClient.get('http://localhost:27092/api/events')
                    .then(result => {
                        _events = result.content;
                        _events.forEach(event => {
                            event.dateime = moment(event.dateTime).format("MM/DD/YYYY HH:mm");
                            event.image = `images/speakers/${event.image}`;
                        });
                        resolve(_events);
                    })
                    .catch(result =>
                        reject(`${result.statusCode}: ${result.statusText}`)
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
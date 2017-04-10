import {eventsData} from 'services/eventsData';
import moment from 'moment';

let _events = undefined;

export class DataRepository {
    get events() {
        return new Promise((resolve) => {
            if (!_events) {
                setTimeout(_ => {
                    _events = eventsData;
                    _events.forEach(event => {
                        let dateTime = moment(event.dateTime).format("MM/DD/YYYY HH:mm");
                        event.dateTime = dateTime;
                        event.image = `images/speakers/${event.image}`;
                    });
                    resolve(_events);
                }, 10);
            }
            else {
                resolve(_events);
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
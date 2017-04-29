export default class Event {
    constructor(subject, action){
        this.subject = subject;
        this.action = action;
    }
    get name() { return `/${this.subject}/${this.action}`; }
}
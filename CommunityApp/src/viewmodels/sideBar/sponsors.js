import {inject, computedFrom} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(BindingSignaler)
export class Sponsors {
	constructor(bindingSignaler) {
        this.message = "Sponsors";
        setTimeout(() => this.message = "Changed after binding", 3000);
        this.mapCollection = new window.Map();
        this.mapCollection.set("a", "Alpha");
        this.mapCollection.set("b", "Beta");
        this.mapCollection.set("c", "Charlie");
        this.mapCollection.set("d", "Delta");
        this.styleString = "background: red";
        this.styleObject = { background: "green" };
        this.customerColor = 'purple';
        this.customerStatus = 'bad';
        this.person = new Person();
        let amount = 99.93;
        this.trades = [{ amount: amount, time: new Date() }];
        //feed numberFeed
        setInterval(() => {
                this.trades.push({amount: amount += 1.79, time: new Date()});
                this.numberFeed.scrollTop = this.numberFeed.scrollHeight;
            }, 3000
        );
        //Change colors on old numbers in numberFeed
        setInterval(() =>  bindingSignaler.signal('check-freshness') , 1000);
    }

	doSomething(message) {
		console.log(message);
	}
}

class Person {
    firstName = "Brian";
    lastName = "Noyes";
    @computedFrom("firstName", "lastName")
    get fullName() { return this.firstName + " " + this.lastName; }
}
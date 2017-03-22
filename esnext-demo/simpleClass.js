import {MyBase} from "MyBase";
import {compute,val2} from "someOtherModule";

//Use the "extends" keyword to derive a class from a base class
export class SimpleClass extends MyBase {
    constructor(){
        //Use the "super" keyword to explicitly invoke a base class' constructor
        super();
        this.name = "Barney"
    }

    get message() {
        let threshold = 40;
        let result = `Hello ${this.name}, are you ${5 + threshold} years old?`;
        return result;
    }

    calculate() { return compute() + val2; }

    startEngine() {
        //Promises are new to ES6 and can be used in the place of callback functions when an event is finished
        // processing
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve("Roar!");
            }, 5000);
        });
        //When a promise is returned from a method, its result can be consumed by another method after the promise has
        //been fulfilled
        return promise;
    }
}
export class Sponsors {
	constructor() {
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
    }

	doSomething(message) {
		console.log(message);
	}
}
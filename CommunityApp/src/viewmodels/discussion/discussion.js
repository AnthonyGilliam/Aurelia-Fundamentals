function getDiscussionInput() {
    "use strict";
    // fake data access
    return '';
}

/// ***JavaScript trick: to get a full deep clone on an object; call JSON.stringify() on the object to parse the object
/// to a JSON formatted string, then call JSON.parse() on the formatted string to return a completely separate object
/// that is an exact clone of its original object***
function cloneObject(obj) {
    "use strict";
    return JSON.parse(JSON.stringify(obj));
}

export class Discussion {
    activate(){
        //retrieve discussionInput from data repo then clone it to compare with later
        this.discussionInput = getDiscussionInput();
        this.originalInput = cloneObject(this.discussionInput);

        //Delay view for 3 sec to witness spinning cog icon in nav-bar.html custom view
        return new Promise((resolve) => { setTimeout(_ => resolve(), 3000); });
    }

    save() {
        //simulate save: make comparison input same as discussionInput
        this.originalInput = cloneObject(this.discussionInput);
    }

    canDeactivate() {
        //Dirty check discussionInput: compare saved data to current text in field
        if(JSON.stringify(cloneObject(this.discussionInput))
            !== JSON.stringify(this.originalInput)) {
            if(confirm("Unsaved data, are you sure you want to navigate away?")) {
                //If user consents, the app is allowed to navigate to next view
                return true;
            }
            else {
                //App stays on current view
                return false
            }
        }
        return true;
    }

    deactivate() {
        console.log('Deactivating discussion')
    }
}
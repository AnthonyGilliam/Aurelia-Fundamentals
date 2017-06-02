export class Discussion {
    activate(){
        //Delay view for 3 sec to witness spinning cog icon in nav-bar.html custom view
        let promise = new Promise((resolve) => { setTimeout(_ => resolve(), 3000); });
        return promise;
    }
}
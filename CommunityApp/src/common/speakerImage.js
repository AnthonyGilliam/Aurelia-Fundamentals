import {inject, customAttribute, bindable} from 'aurelia-framework';

@inject(Element)
@customAttribute('speaker-img')
export class SpeakerImage {
    @bindable imageName;
    @bindable isMvp;

    constructor(element){
        this.element = element;
    }

    imageNameChanged(newValue){
        this.element.src = 'images/speakers/' + newValue;
    }

    isMvpChanged(newValue){
        if(newValue) {
            var el = document.createElement("div");
            el.innerHTML = "MVP";
            el.className = "watermark";
            this.element.parentNode.insertBefore(el, this.element.nextSibling);
        }
    }
}
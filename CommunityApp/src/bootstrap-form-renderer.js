import {
    ValidationRenderer,
    RenderInstruction,
    ValidationError
} from 'aurelia-validation';

export class BootstrapFormRenderer {
    anyErrors = nodeList => {
        let text = '';
        nodeList.forEach(node => text += node.innerText)
        return text;
    };

    render(instruction) {
        for (let {result, elements} of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, result);
            }
        }

        for (let {result, elements} of instruction.render) {
            for (let element of elements) {
                this.add(element, result);
            }
        }
    }

    add(element, error) {
        const formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }

        // add help-block
        const message = document.createElement('span');
        message.className = 'help-block validation-message';
        message.textContent = error.message;
        message.id = `validation-message-${error.id}`;
        formGroup.appendChild(message);

        // add the has-error class to the enclosing form-group div if there are valid errors
        if (error.message)
            formGroup.classList.add('has-error');
    }

    remove(element, error) {
        const formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }

        // remove help-block
        const message = formGroup.querySelector(`#validation-message-${error.id}`);
        if (message) {
            formGroup.removeChild(message);
            // remove the has-error class from the enclosing form-group div
            let errors = formGroup.querySelectorAll('.help-block.validation-message');
            let errorText = this.anyErrors(errors);
            if (errors.length === 0 || !errorText) {
                formGroup.classList.remove('has-error');
            }
        }
    }
}
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function contactValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const contact = control.value as string;
        const regexPattern = /^(9|8|6)\d{7}$/;

        if (!contact) {
            return null; 
        }

        if (regexPattern.test(contact)) {
            return null; 
        } else {
            return {invalidContact: true}; 
        }
    };
}
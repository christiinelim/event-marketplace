import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function websiteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const website = control.value as string;
        const websiteRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

        if (!website) {
            return null;
        }

        if (websiteRegex.test(website)) {
            return null;
        } else {
            return { invalidWebsite: true };
        }
    };
}

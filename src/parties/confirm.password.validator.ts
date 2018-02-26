import {AbstractControl} from "@angular/forms";

export class ConfirmPasswordValidator {

 public passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
}

}

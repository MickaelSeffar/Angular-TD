import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchingValidator : ValidatorFn = (control: AbstractControl): ValidationErrors| null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value?
    null : {passwordMatching: true};


};
export  class ConfirmValidParentMatcherl{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return  !!(control && control.parent
      && control.parent.invalid && (control.touched || isSubmitted));
  }
}

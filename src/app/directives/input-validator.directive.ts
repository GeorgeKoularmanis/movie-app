import { Attribute, Directive, forwardRef } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: '[appInputValidator][formControlName], [appInputValidator][formControl], [appInputValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputValidatorDirective),
    multi: true
  }]
})
export class InputValidatorDirective implements Validator{

  public minLength = 3;
  private regExpr = new RegExp(/^[A-Z|a-z|0-9]+$/);

  constructor() {}

  validate(c: AbstractControl): { [key: string] : boolean } | null {
    let inputValue: string = c.value;

    if (
      inputValue
        &&
      inputValue.trim()
        &&
      ( inputValue.length >= this.minLength )
        &&
      this.regExpr.test(inputValue)
    ) { return null; }

    return {
      inputValidator: false
    };
  }

}

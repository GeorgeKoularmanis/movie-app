import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appRateValidator][formControlName], [appRateValidator][formControl],[appRateValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RateValidatorDirective),
    multi: true
  }]
})
export class RateValidatorDirective {

  private minValue: number = 0.5;
  private maxValue: number = 10;
  private regExpr = new RegExp(/^[0-9]*\.?[0-9]*$/);

  validate(c: AbstractControl): { [key: string] : boolean } | null {
    let inputValue: string = c.value;

    if (
      inputValue
        &&
      inputValue.trim()
        &&
      Number(inputValue)
        &&
      ( Number(inputValue) >= this.minValue )
        &&
      ( Number(inputValue) < this.maxValue)
        &&
      this.regExpr.test(inputValue)
    ) { return null; }

    return {
      inputValidator: false
    };

  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spokenLanguages'
})
export class SpokenLanguagesPipe implements PipeTransform {

  transform(value: any) {
    let newValue: string = '';

    if(value && value.length){
      value.forEach(element => {
        if(element.name){
          newValue = newValue + (newValue ? ', ' : '' ) + element.name;
        }
      });

      return newValue;
    }

    return null;
  }

}

import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl, FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";

export interface RequestForm{
  userLogin: string,
  justification: string,
  neededCapacity: number,
  date: string,
  beginAt: string,
  endAt: string,
  materialIds: number[],
  additionalNotes: string
}

export const REQUEST_FORM = {
  userLogin: [,[Validators.required]],
  justification: [, [Validators.required]],
  neededCapacity: [, [Validators.required, Validators.min(5)]],
  date: [, daysInFuture(3)],
  beginAt: [],
  endAt: [],
  materialIds: new FormArray<FormControl>([]),
  additionalNotes: []
}

export const REQUEST_FORM_OPTIONS: AbstractControlOptions = {
  validators: [dateABeforeB('beginAt', 'endAt')]
}

export function daysInFuture(days: number){
  return (control: AbstractControl): ValidationErrors | null => {
    const inputValue = new Date(control.value);
    const today = new Date();
    today.setDate(today.getDate() + days); // add 3 days to today's date
    return (inputValue > today) ? null : { 'notFutureDate': true };
  }
}

export function dateABeforeB(formControlNameA: string, formControlNameB: string){
  return (control: AbstractControl): ValidationErrors | null => {
    const form = <FormGroup>control;

    const dateA = form.get(formControlNameA)?.value;
    const dateB = form.get(formControlNameB)?.value;

    if( !dateA || !dateB )
      return null;

    const error = dateA < dateB ? null : { dateABeforeB: `${formControlNameA} should be before ${formControlNameB}`};
    if( error ){
      form.controls[formControlNameA].setErrors({...form?.controls?.[formControlNameA].errors,...error})
      form.controls[formControlNameB].setErrors({...form?.controls?.[formControlNameB].errors,...error})
    }
    else {
      delete form.controls[formControlNameA].errors?.['dateABeforeB'];
      delete form.controls[formControlNameB].errors?.['dateABeforeB'];
      if( !hasProps(form.controls[formControlNameA].errors)  )
        form.controls[formControlNameA].setErrors(null);
      if( !hasProps(form.controls[formControlNameB].errors)  )
        form.controls[formControlNameB].setErrors(null);
    }

    return error;
  }
}

function hasProps(obj: any){
  if(!obj)
    return false;

  return Object.keys(obj).length > 0;
}


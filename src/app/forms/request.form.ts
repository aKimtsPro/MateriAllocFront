import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
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
  validators: [dateABeforeB('beginsAt', 'endAt')]
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
    const dateA = new Date(new Date().toDateString() + control.value[formControlNameA])
    const dateB = new Date(new Date().toDateString() + control.value[formControlNameB])

    return dateA < dateB ? null : { 'dateABeforeB': formControlNameA + " should be before " + formControlNameB }
  }
}

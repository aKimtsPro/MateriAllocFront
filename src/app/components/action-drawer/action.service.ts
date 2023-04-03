import {Injectable, Type} from '@angular/core';
import {ActionComponent} from "./action.component";
import {BehaviorSubject, Subject} from "rxjs";

export class Action {

  constructor(public component: Type<ActionComponent>, public data: any) {}

}

@Injectable()
export class ActionService {

  private _actionTrigger = new Subject<Action | undefined>();

  constructor() {}

  openComponent(action: Action){
    this._actionTrigger.next(action);
  }

  clearComponent(){
    this._actionTrigger.next(undefined);
  }

  get $actionTrigger(){
    return this._actionTrigger.asObservable();
  }

}

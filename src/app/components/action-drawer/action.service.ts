import {Injectable, Type} from '@angular/core';
import {ActionComponent} from "./action.component";
import {BehaviorSubject, Subject} from "rxjs";

export class Action {

  constructor(
    private readonly _component: Type<ActionComponent>,
    private readonly _data: any,
    private readonly _changeSame?: boolean
  ) {}

  get component(): Type<ActionComponent> {
    return this._component;
  }

  get data(): any {
    return this._data;
  }

  get changeSame(): boolean | undefined {
    return this._changeSame;
  }
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

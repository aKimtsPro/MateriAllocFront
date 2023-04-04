import {ComponentRef, Directive, Type, ViewContainerRef} from '@angular/core';
import {Action} from "../action.service";
import {MatDrawer} from "@angular/material/sidenav";
import {ActionComponent} from "../action.component";

@Directive({
  selector: '[appActionHost]'
})
export class ActionHostDirective {

  private _loadedComponentType!: Type<ActionComponent>;
  private _viewComponent!: ComponentRef<ActionComponent>;

  constructor(public viewContainerRef: ViewContainerRef) { }

  loadComponent(action: Action, drawer: MatDrawer, changeSame?: boolean){

    if(changeSame || this._loadedComponentType != action.component){
      this.viewContainerRef.clear();
      this._viewComponent = this.viewContainerRef.createComponent(action.component);
      this._viewComponent.instance.drawer = drawer;
      this._loadedComponentType = action.component;
    }
    this._viewComponent.instance.data = action.data;

  }

  clear(){
    this.viewContainerRef.clear();
  }

}

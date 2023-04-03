import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {ActionHostDirective} from "./action-host/action-host.directive";
import {NavItemComponent} from "../nav-item/nav-item.component";
import {Action, ActionService} from "./action.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'action-drawer',
  templateUrl: './action-drawer.component.html',
  styleUrls: ['./action-drawer.component.css']
})
export class ActionDrawerComponent implements OnInit, OnDestroy {

  @Input()
  drawer!: MatDrawer;

  @ViewChild(ActionHostDirective, {static: true})
  host!: ActionHostDirective;

  private _actionSub!: Subscription;


  constructor(private readonly _actionService: ActionService) {}

  ngOnInit(): void {
    this._actionSub = this._actionService.$actionTrigger.subscribe(action => action ? this.loadComponent(action) : this.clear())
  }

  ngOnDestroy(): void {
    this._actionSub.unsubscribe();
  }



  loadComponent(action: Action){
    this.drawer.open();
    const viewContainer = this.host.viewContainerRef;
    viewContainer.clear();
    const viewComponent = viewContainer.createComponent(action.component);
    viewComponent.instance.data = action.data;
    viewComponent.instance.drawer = this.drawer;
  }

  clear(){
    this.drawer.close();
    const viewContainer = this.host.viewContainerRef;
    viewContainer.clear();
  }

}

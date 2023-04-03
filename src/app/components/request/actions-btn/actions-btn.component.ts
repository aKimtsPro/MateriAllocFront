import {Component, Input, OnInit} from '@angular/core';
import {Request} from "../../../models/request.model";
import {ActionService, Action} from "../../action-drawer/action.service";
import {AcceptActionComponent} from "../../action-drawer/accept-action/accept-action.component";
import {ConfirmActionComponent} from "../../action-drawer/confirm-action/confirm-action.component";
import {RequestService} from "../../../services/request.service";

interface RequestAction {
  label: string,
  action: () => void
}

@Component({
  selector: 'app-actions-btn',
  templateUrl: './actions-btn.component.html',
  styleUrls: ['./actions-btn.component.css']
})
export class ActionsBtnComponent implements OnInit {

  @Input()
  request! : Request;
  actions: {[key:string]: RequestAction[]} = {
    "PENDING"   : [
      {label: "accept", action: () => this.accept()},
      {label: "refuse", action: () => this.refuse()}
    ],
    "ACCEPTED"  : [
      {label: "relocate", action: () => this.relocate()}],
    "REFUSED"   : [],
    "RELOCATING": [
      {label: "accept", action: () => this.accept()},
      {label: "refuse", action: () => this.refuse()}
    ]
  };

  constructor(
    private readonly _actionService: ActionService,
    private readonly _requestService: RequestService
  ) { }

  ngOnInit(): void {
  }

  accept(){
    this._actionService.openComponent(new Action(AcceptActionComponent, {request: this.request}));
  }

  refuse(){
    this._actionService.openComponent(
      new Action(
        ConfirmActionComponent,
        {
          action: "refuse",
          request: this.request
        }
      )
    )
  }

  relocate(){
    this._actionService.openComponent(
      new Action(
        ConfirmActionComponent,
        {
          action: "relocate",
          request: this.request
        })
    );
  }

}

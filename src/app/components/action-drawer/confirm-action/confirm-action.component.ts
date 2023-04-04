import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionComponent} from "../action.component";
import {MatDrawer} from "@angular/material/sidenav";
import {ActionService} from "../action.service";
import {RequestService} from "../../../services/request.service";
import {NgModel, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Request} from "../../../models/request.model";

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css', '../action.css']
})
export class ConfirmActionComponent implements ActionComponent, OnInit {


  data: any;
  drawer!: MatDrawer;

  action!: string;
  request!: Request;
  justification?: string;

  @ViewChild(NgModel, { static: true }) receiverInput!: NgModel;

  constructor(
    private readonly _actionService: ActionService,
    private readonly _requestService: RequestService,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this.action = this.data.action;
    this.request = this.data.request;
    this.receiverInput.control.setValidators([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)
    ])
  }

  confirm(){
    if( this.receiverInput.valid && this.justification ){
      this.requestObs.subscribe({
        next: () => {
          this._actionService.clearComponent();
          this._router.navigate(['request', this.action==='relocate'?'relocating':'refused']);
        }
      })
    }
  }


  get requestObs(){
    if(!this.justification)
      throw "justification needed";

    switch(this.action){
      case "relocate": return this._requestService.relocateRequest({reqId: this.request.id,justification: this.justification})
      case "refuse": return this._requestService.refuseRequest({reqId: this.request.id,justification: this.justification})
      default: throw "invalid action"
    }
  }


}

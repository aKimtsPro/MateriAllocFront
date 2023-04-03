import { Component, OnInit } from '@angular/core';
import {ActionComponent} from "../action.component";
import {MatDrawer} from "@angular/material/sidenav";
import {RequestService} from "../../../services/request.service";
import {RoomDTO} from "../../../models/room.model";
import {Request} from "../../../models/request.model";
import {ActionService} from "../action.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accept-action',
  templateUrl: './accept-action.component.html',
  styleUrls: ['./accept-action.component.css']
})
export class AcceptActionComponent implements ActionComponent, OnInit {

  // region: fields
  data: any;
  drawer!: MatDrawer;
  compatibleRooms!: RoomDTO[];
  request!: Request;
  selectedRoom?: RoomDTO;
  // endregion

  constructor(
    private readonly _requestService: RequestService,
    private readonly _actionService: ActionService,
    private readonly _router: Router
  ) {
  }

  // region: lifecycle
  ngOnInit(): void {
    this.request = this.data.request;
    console.log(this.request)
    this._requestService.getCompatibleRooms(this.request.id)
      .subscribe(data => this.compatibleRooms = data);
  }
  // endregion

  toggleSelection(room: RoomDTO){
    this.selectedRoom = this.selectedRoom === room ? undefined : room;
  }

  accept(){
    if( this.selectedRoom ){
      this._requestService.acceptRequest(this.request.id, this.selectedRoom.id).subscribe({
        next: () => {
          this._actionService.clearComponent()
          this._router.navigateByUrl("request/accepted")
        }
      })
    }
  }

  relocate(){

  }


}

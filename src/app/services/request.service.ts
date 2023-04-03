import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ReducedRequestDTO} from "../models/request.model";
import {RoomDTO} from "../models/room.model";
import {RequestForm} from "../forms/request.form";


interface StatusChangeForm {
  reqId: number,
  justification: string,
}

interface AcceptForm extends StatusChangeForm {
  roomId: number
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly BASE_URL = "http://localhost:8080/api/request";

  constructor(private readonly _client: HttpClient) { }


  get(status?: string){
    let params = new HttpParams();
    if(status)
      params = params.set("status", status);

    return this._client.get<ReducedRequestDTO[]>(`${this.BASE_URL}/future`, {params: params})
  }

  getCompatibleRooms(id: number){
    return this._client.get<RoomDTO[]>(`${this.BASE_URL}/${id}/rooms`)
  }

  acceptRequest(reqId: number, roomId: number ){
    let params = new HttpParams()
      .set("justification", "accepted")
      .set("roomId", roomId);

    return this._client.post<never>(`${this.BASE_URL}/${reqId}/accept`, undefined, {params:params});
  }

  relocateRequest(form: StatusChangeForm){
    let params = new HttpParams()
      .set("justification", form.justification);

    return this._client.post(`${this.BASE_URL}/${form.reqId}/relocate`, undefined, {params:params})
  }

  refuseRequest(form: StatusChangeForm){
    let params = new HttpParams()
      .set("justification", form.justification);

    return this._client.post(`${this.BASE_URL}/${form.reqId}/refuse`, undefined, {params:params})
  }

  createRequest(form: RequestForm){
    return this._client.post<never>(`${this.BASE_URL}/create`, form)
  }

}

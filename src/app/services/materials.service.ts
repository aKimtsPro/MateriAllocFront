import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MaterialDTO} from "../models/request.model";

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {


  private readonly BASE_URL = "http://localhost:8080/api/material"

  constructor(private readonly _client: HttpClient) { }

  getAll() {
    return this._client.get<MaterialDTO[]>(this.BASE_URL)
  }
}

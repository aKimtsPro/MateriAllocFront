import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { daysInFuture, REQUEST_FORM_OPTIONS } from "src/app/forms/request.form";
import { MaterialDTO } from "src/app/models/request.model";
import { RequestService } from "src/app/services/request.service";
import { MaterialsService } from "src/app/services/materials.service";
import { Router } from "@angular/router";
import {ActionComponent} from "../../action-drawer/action.component";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css', '../../action-drawer/action.css']
})
export class CreateRequestComponent implements OnInit, ActionComponent {

  form: FormGroup;
  materials!: MaterialDTO[]
  selectedMat: MaterialDTO[] = [];
  error: any;
  data: any;
  drawer!: MatDrawer;


  constructor(
    builder: FormBuilder,
    private readonly _matService: MaterialsService,
    private readonly _reqService: RequestService,
    private readonly _router: Router
  ) {
    this.form = builder.group({
      userLogin: [,[Validators.required]],
      justification: [, [Validators.required]],
      neededCapacity: [, [Validators.required, Validators.min(5)]],
      date: [, daysInFuture(3)],
      beginAt: ["09:00"],
      endAt: ["18:00"],
      materialIds: builder.array<number>([]),
      additionalNotes: []
    }, REQUEST_FORM_OPTIONS)
  }

  ngOnInit(): void {
    this._matService.getAll().subscribe(data => this.materials = data);
  }
  onSubmit(){
    console.log(this.form)
    // if(this.form.valid)
      this._reqService.createRequest(this.form.value).subscribe({
        next: () => this._router.navigate(["request", "pending"]),
        error: err => this.error = err
      })
  }
  addMaterial(mat: MaterialDTO){
    if( this.isSelected(mat) ){
      this.selectedMat.push(mat);
      (<FormArray>this.form.get("materialIds")).push(new FormControl(mat.id));
    }
  }

  isSelected(mat: MaterialDTO){
    return !this.selectedMat.includes( mat );
  }

  getMaterial(id: number){
    return this.selectedMat.find((mat) => mat.id == id );
  }

  removeMaterial(index: number){
    (<FormArray>this.form.get("materialIds")).removeAt(index);
    this.selectedMat.splice(index, 1);
  }



}

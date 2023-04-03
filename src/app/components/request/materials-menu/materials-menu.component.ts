import {Component, Input, OnInit} from '@angular/core';
import {MaterialDTO} from "../../../models/request.model";

@Component({
  selector: 'app-materials-menu',
  templateUrl: './materials-menu.component.html',
  styleUrls: ['./materials-menu.component.css']
})
export class MaterialsMenuComponent implements OnInit {

  @Input()
  materials!: MaterialDTO[];

  @Input()
  disabled : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

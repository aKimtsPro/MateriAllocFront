import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../services/request.service";
import {map, Subscription} from "rxjs";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";
import {Request} from "../../models/request.model";
import {ActionService, Action} from "../action-drawer/action.service";
import {CreateRequestComponent} from "./create-request/create-request.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnDestroy, AfterViewInit {

  loading = true;
  error?: any;
  requests?: Request[];
  status?: string;
  private _routeUpdateSub!: Subscription;

  // region DataTable
  displayedColumns: string[] = ['id', 'begin', 'end', 'currentStatus', 'neededCapacity', 'materials', 'actions'];
  dataSource = new MatTableDataSource<Request>([]);


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // endregion



  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _service : RequestService,
    private readonly _router: Router,
    private readonly _actionService: ActionService,
    private readonly _liveAnnouncer: LiveAnnouncer
  ) {
  }

  ngOnInit(): void {
    this._routeUpdateSub = this._route.data.subscribe( data => {
      this.status = data["status"];
      this.loadRequest();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._routeUpdateSub.unsubscribe();
  }

  loadRequest(){
    this.loading = true;
    this._service.$reloader(this.status).pipe(map( data =>  data.map(Request.from) )).subscribe({
      next: data => {
        this.dataSource.data = data
        this.requests = data;
        this.loading = false;
      },
      error: err => this.error = err
  });
  }

  onStatusChange(event: any){
    this._router.navigateByUrl("/request"+ (event.value === 'ALL' ? '' :'/'+event.value.toLowerCase()))
  }

  createRequest(){
    this._actionService.openComponent(new Action(CreateRequestComponent, { action: "create"}))
  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

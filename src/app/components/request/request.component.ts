import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../services/request.service";
import {map, Subscription} from "rxjs";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";
import {Request} from "../../models/request.model";

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

  displayedColumns: string[] = ['id', 'begin', 'end', 'currentStatus', 'neededCapacity', 'materials', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource();

  private _routeUpdateSub!: Subscription;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _service : RequestService,
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly _router: Router
  ) {
  }

  ngOnInit(): void {
    this._routeUpdateSub = this._route.data.subscribe( data => {
      this.status = data["status"];
      this.loadData();
    });
  }
  ngOnDestroy(): void {
    this._routeUpdateSub.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadData(){
    this.loading = true;
    this._service.get(this.status).pipe(map( data =>  data.map(Request.from) )).subscribe({
      next: data => {
        this.dataSource.data = data
        this.requests = data;
        this.loading = false
      },
      error: err => this.error = err
  });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onChange(event: any){
    this._router.navigateByUrl("/request"+ (event.value === 'ALL' ? '' :'/'+event.value.toLowerCase()))
  }

}

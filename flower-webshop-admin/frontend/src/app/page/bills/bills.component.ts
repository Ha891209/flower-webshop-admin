import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {


  tableColumns: ITableCol[] = [];
  list$: Observable<Bill[]> = this.billService.getAll();

  constructor(
    public config: ConfigService,
    public billService: BillService,
  ) { }

  ngOnInit(): void {

  }
}
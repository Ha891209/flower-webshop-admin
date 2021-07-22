import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableCol, ConfigService, SelectedToDelete } from 'src/app/service/config.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends { [propname: string]: any }> implements OnInit {

  @Input() tableColumns: ITableCol[] = [];
  @Input() list$: Observable<T[]> | null = null;
  @Input() selectedToDelete!: SelectedToDelete;
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  selectedToDeleteItem: any;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    console.log(this.list$)
  }

  selectedItemToDelete(row: any): void {
    this.selectedToDeleteItem = row;
  }

  onClickDelete(): void {
    this.deleteClick.emit(this.selectedToDeleteItem);
  }

}
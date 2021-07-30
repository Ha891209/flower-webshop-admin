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
  @Input() filterKey: string = '';
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();

  selectedToDeleteItem: any;
  sorterKey: string = '';
  sorterDirection: number = 1;
  phrase: string = '';

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

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }

    this.sorterKey = key;
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService, ITableCol, SelectedToDelete } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  tableColumns: ITableCol[] = this.config.customerTableCols;
  list$: Observable<Customer[]> = this.customerService.list$;
  selectedToDelete: SelectedToDelete = this.config.selectedToDeleteCustomer;


  constructor(
    private config: ConfigService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  }

  onClickDelete(customer: Customer): void {
    this.customerService.remove(customer)
      .subscribe(
        () => {
          this.customerService.getAll();
          this.router.navigate(['/customers']);
        }
      )
  }
}
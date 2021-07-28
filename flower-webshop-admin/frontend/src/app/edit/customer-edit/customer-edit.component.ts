import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['../common/edit.scss']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer = new Customer();
  customerId: string = '';
  updating: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.customerId = params.id
        console.log(params)
      }
    );
    this.customerService.get(parseInt(this.customerId)).subscribe(
      customer => this.customer = customer
    );
  }

  setCustomerToDatabase(customer: Customer): void {
    this.updating = true;
    if (parseInt(this.customerId) === 0) {
      this.customerService.create(customer).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['customers']);
        }
      );
    } else {
      this.customerService.update(customer).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['customers']);
        }
      );
    }
  }

}

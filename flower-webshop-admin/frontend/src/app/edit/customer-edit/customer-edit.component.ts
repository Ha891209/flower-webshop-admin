import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  id: number = 0;
  updating: boolean = false;
  customer: Customer = new Customer();


  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params.id);
  }

  onUpdate(customer: Customer): void {
    this.updating = true;
    if (customer.id === '') {
      this.customerService.create(customer).subscribe(
        () => {
          this.toastr.success('Sikeres vásárló létrehozás!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['customers']);
        },
        error => this.toastr.error('Hiba a vásárló létrehozásakor!', 'Hiba!', { timeOut: 3000 })
      )
    } else {
      this.customerService.update(customer).subscribe(
        () => {
          this.toastr.success('Sikeresen frissítetted a vásárlót!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['customers']);
        },
        error => this.toastr.error('Hiba történt a vásárló frissítésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }
}
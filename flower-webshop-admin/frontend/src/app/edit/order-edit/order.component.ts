import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order.component.html',
  styleUrls: ['../common/edit.scss']
})
export class OrderEditComponent implements OnInit {

  order: Order = new Order();
  order_Id: string = '';
  updated: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.order_Id = params._id
        console.log(params)
      }
    );
    this.orderService.get(this.order_Id).subscribe(
      order => {
        this.order = order
      }
    );
  }

  setOrderToDatabase(order: Order): void {
    this.updated = true;
    if (parseInt(this.order_Id) === 0) {
      this.orderService.create(order).subscribe(
        () => {
          this.updated = false;
          this.router.navigate(['orders']);
        }
      );
    } else {
      this.orderService.update(order).subscribe(
        () => {
          this.updated = false;
          this.router.navigate(['orders']);
        }
      );
    }
  }

}

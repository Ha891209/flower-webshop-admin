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
  orderId: string = '';
  updated: boolean = false; 

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        this.orderId = params.id
        console.log(params)
      } 
    );
    this.orderService.get(parseInt(this.orderId)).subscribe(
      order => {
        this.order = order
      }
    );
  }

  setOrderToDatabase(order: Order): void {
    this.updated = true;
    if (parseInt(this.orderId) === 0) {
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

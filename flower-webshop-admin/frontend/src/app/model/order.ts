import { Customer } from './customer';
import { Flower } from './flower';

export class Order {
    _id: string = '';
    flower: Flower = new Flower();
    customer: Customer = new Customer();
    amount: number = 0;
    status: string = '';
    time: Date = new Date();
}

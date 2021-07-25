import { Customer } from "./customer";
import { Flower } from "./flower";


export class Order {
    id: string = '';
    customer: Customer = new Customer();
    products: Flower[] = [];
    time: Date = new Date();
    note: string = '';
}

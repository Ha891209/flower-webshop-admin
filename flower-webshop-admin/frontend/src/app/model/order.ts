import { Customer } from "./customer";
import { Flower } from "./flower";

export class Order {
    _id: string = '';
    products: Flower[] = [];
    customerID: number = 0;
    amount: number = 0;
    status: string = '';
    time: Date = new Date();
}

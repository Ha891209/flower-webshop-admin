import { Address } from "./address";


export class Customer {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    address: Address = new Address();
    active: boolean = false;
}


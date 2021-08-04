import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  text: string;
  editable?: boolean;
}

export interface SelectedToDelete {
  key: string;
  text?: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'http://127.0.0.1:3000/login';

  constructor() { }

  orderTableCols: ITableCol[] = [
    { key: '_id', text: '#', editable: false },
    { key: 'products', text: 'Termékek', editable: true },
    { key: 'customerID', text: 'Vásárló', editable: true },
    { key: 'amount', text: 'Összeg', editable: true },
    { key: 'status', text: 'Státusz', editable: true }
  ];

  flowerTableCols: ITableCol[] = [
    { key: '_id', text: '#', editable: false },
    { key: 'name', text: 'Név', editable: true },
    { key: 'description', text: 'Leírás', editable: true },
    { key: 'active', text: 'Aktív', editable: true },
    { key: 'price', text: 'Ár', editable: true },

  ];

  customerTableCols: ITableCol[] = [
    { key: '_id', text: '#', editable: false },
    { key: 'firstName', text: 'Keresztnév', editable: true },
    { key: 'lastName', text: 'Vezetéknév', editable: true },
    { key: 'email', text: 'Email', editable: true },
    { key: 'address', text: 'Cím', editable: true },
    { key: 'active', text: 'Aktív', editable: true }
  ];

  selectedToDeleteFlower: SelectedToDelete = {
    key: 'name',
    text: 'nevű virágot?'
  }

  selectedToDeleteCustomer: SelectedToDelete = {
    key: 'firstName',
    text: 'nevű vásárlót?'
  }

  selectedToDeleteOrder: SelectedToDelete = {
    key: '_id',
    text: 'megrendelést?'
  }

  topFlowerTableCols: ITableCol[] = [
    { key: 'active', text: 'Aktív' },
    { key: 'highlighted', text: 'Kiemelt' },
  ]
}

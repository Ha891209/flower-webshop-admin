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

  apiUrl: string = 'http://localhost:3000';


  constructor() { }

  orderTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'products', text: 'Termékek', editable: true },
    { key: 'customerID', text: 'Vásárló', editable: true },
    { key: 'amount', text: 'Összeg', editable: true },
    { key: 'status', text: 'Státusz', editable: true }
  ];

  flowerTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'title', text: 'Cím', editable: true },
    { key: 'active', text: 'Aktív', editable: true },
    { key: 'price', text: 'Ár', editable: true }
  ];

  customerTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'firstName', text: 'Keresztnév', editable: true },
    { key: 'lastName', text: 'Vezetéknév', editable: true },
    { key: 'email', text: 'Email', editable: true },
    { key: 'address', text: 'Cím', editable: true },
    { key: 'active', text: 'Aktív', editable: true }
  ];

  selectedToDeleteMovie: SelectedToDelete = {
    key: 'title',
    text: 'című filmet?'
  }

  selectedToDeleteCustomer: SelectedToDelete = {
    key: 'firstName',
    text: 'nevű vásárlót?'
  }

  selectedToDeleteOrder: SelectedToDelete = {
    key: 'id',
    text: 'megrendelést?'
  }
}
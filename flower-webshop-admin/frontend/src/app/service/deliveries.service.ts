import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deliveries } from '../model/deliveries';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService<Deliveries> {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
    this.entity = 'deliveries';
  }
}
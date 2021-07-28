import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flower } from '../model/flower';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FlowerService extends BaseService<Flower> {

  constructor(
    public config: ConfigService,
    public http: HttpClient
  ) {
    super(config, http, 'flowers');
  }
}

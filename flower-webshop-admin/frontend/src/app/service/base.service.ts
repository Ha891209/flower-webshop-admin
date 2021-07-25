import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: string }>{

  private readonly apiUrl: string = 'http://localhost:3000';
  entityName: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    public config: ConfigService,
    public http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.entityName}`);
  }

  getOne(_id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.entityName}/${_id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.entityName}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${this.entityName}/${entity.id}`, entity);
  }

  remove(entity: T | number): Observable<T> {
    let entityId = typeof entity === 'number' ? entity : entity.id;
    return this.http.delete<T>(`${this.config.apiUrl}/${this.entityName}/${entityId}`);
  }
}

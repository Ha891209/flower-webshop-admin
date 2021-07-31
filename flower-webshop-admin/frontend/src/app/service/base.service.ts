import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { _id: string }> {
  entityName: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    public config: ConfigService,
    public http: HttpClient,
    @Inject('entityName') entityName: string
  ) {
    this.entityName = entityName;
  }

  getAll(): void {
    this.http.get<T[]>(`${this.config.apiUrl}/${this.entityName}`)
      .subscribe(
        list => this.list$.next(list),
        err => console.error(err)
      );
  }

  get(_id: number): Observable<T> {
    return Number(_id) === 0 ? new Observable<T>() : this.http.get<T>(`${this.config.apiUrl}/${this.entityName}/${_id}`);
  }

  create(entity: T): Observable<T> {
    return this.http
      .post<T>(`${this.config.apiUrl}/${this.entityName}`, entity)
      .pipe(tap((e) => this.getAll()));
  }

  update(entity: T): Observable<T> {
    return this.http
      .patch<T>(`${this.config.apiUrl}/${this.entityName}/${entity._id}`, entity);
  }

  remove(entity: T | number): Observable<T> {
    let entity_Id = typeof entity === 'number' ? entity : entity._id;
    return this.http.delete<T>(`${this.config.apiUrl}/${this.entityName}/${entity_Id}`);
  }
}

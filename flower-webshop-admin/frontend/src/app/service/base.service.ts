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
    const user = localStorage.getItem('currentUser');
    this.http.get<T[]>(`${this.config.apiUrl}/${this.entityName}`, {
      headers: {
        'Authorization': `Bearer ${user ? JSON.parse(user).accessToken : ''}`
      }
    })
      .subscribe(
        list => this.list$.next(list),
        err => console.error(err)
      );
  }

  get(id: string): Observable<T> {
    const user = localStorage.getItem('currentUser');
    return id === '0' ? new Observable<T>() : this.http.get<T>(`${this.config.apiUrl}/${this.entityName}/${id}`, {
      headers: {
        'Authorization': `Bearer ${user ? JSON.parse(user).accessToken : ''}`
      }
    });
  }

  create(entity: T): Observable<T> {
    const user = localStorage.getItem('currentUser');
    return this.http
      .post<T>(`${this.config.apiUrl}/${this.entityName}`, entity, {
        headers: {
          'Authorization': `Bearer ${user ? JSON.parse(user).accessToken : ''}`
        }
      })
      .pipe(tap((e) => this.getAll()));
  }

  update(entity: T): Observable<T> {
    const user = localStorage.getItem('currentUser');
    return this.http
      .patch<T>(`${this.config.apiUrl}/${this.entityName}/${entity._id}`, entity, {
        headers: {
          'Authorization': `Bearer ${user ? JSON.parse(user).accessToken : ''}`
        }
      });
  }

  remove(entity: T | string): Observable<T> {
    const user = localStorage.getItem('currentUser');
    let entityId = typeof entity === 'string' ? entity : entity._id;
    return this.http.delete<T>(`${this.config.apiUrl}/${this.entityName}/${entityId}`, {
      headers: {
        'Authorization': `Bearer ${user ? JSON.parse(user).accessToken : ''}`
      }
    });
  }
}
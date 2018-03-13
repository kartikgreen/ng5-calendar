import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
export interface EventsCategory {
    id: number;
    category: string;
}

@Injectable()
export class EventsCalendarRepositoryService {
  readonly ROOT_URL = 'http://events.com';

  constructor(private http: HttpClient,
             ) {}

  getEventsData(data): Observable<EventsCategory[]> {
    console.log('Get events data method called', data);  
    return this.http.get<EventsCategory[]>(`${this.ROOT_URL}/SelectVendorProducts/1`);
  }
}
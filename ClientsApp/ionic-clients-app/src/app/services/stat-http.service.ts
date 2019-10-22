import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stats } from '../models/Stats';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class StatHttpService {

    public endpoint = 'stats';

  constructor(private us: UserHttpService, private http: HttpClient) {}

  getStats(){
    return this.http.get<Stats[]>(this.endpoint);
  }


}
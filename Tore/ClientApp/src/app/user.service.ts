import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';


@Injectable({ providedIn: 'root' })

export class UserService {

  user:User;
  baseUrl = "https://localhost:44307/api/User/";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl + 'GetAllUsers');
    }
    register():Observable<boolean> {debugger;
      return this.http.post<boolean>(this.baseUrl + 'Register' , this.user);
  }
}



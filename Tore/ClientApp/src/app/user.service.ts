import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { Question } from 'src/Models/Question';


@Injectable({ providedIn: 'root' })

export class UserService {

  user:User=new User(0,"abc1724@gmail.com","");
  question:Question;
  questionList:Question[];

  baseUrl = "https://localhost:44307/api/User/";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl + 'GetAllUsers');
    }
    register():Observable<boolean> {debugger;
      return this.http.post<boolean>(this.baseUrl + 'Register' , this.user);
  }
  SendQuestion() : Observable<any>{
    return this.http.post<boolean>(this.baseUrl + 'Question' , this.question);
  }
  getAllQuestion(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'GetAllQuestion');
  }
}



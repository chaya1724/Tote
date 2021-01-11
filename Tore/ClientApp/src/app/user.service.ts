import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { Question } from 'src/Models/Question';
import { Answer } from 'src/Models/Answer';


@Injectable({ providedIn: 'root' })

export class UserService {

  public user: User = new User(0, "abc1724@gmail.com", "");
  public question: Question;
  public answer: Answer;
  public questionList: Question[];
  public questionListShow: any[];
  public answerList: Answer[];
  public Users: any[];
  public indexOfQustion: number;
  public pathSO: string;
  public pathShas: string;
  public pathRambam: string;
 public currentPath: string;
 flagSelectedPage:boolean=false
  baseUserUrl = "https://localhost:44307/api/Users/";
  baseQuestionsUrl = "https://localhost:44307/api/Questions/";
  baseAnswersUrl = "https://localhost:44307/api/Answers/";


  constructor(private http: HttpClient) {
   }

  getAll(): Observable<any[]> {debugger
    return this.http.get<any[]>(this.baseUserUrl + 'GetUsers');
  }
  register(): Observable<any> {
    return this.http.post<any>(this.baseUserUrl + 'PostUser', this.user);
  }
  getAllQuestion(): Observable<any[]> {
    return this.http.get<any[]>(this.baseQuestionsUrl + 'GetQuestions');
  } 
  SendQuestion(): Observable<any> {
    return this.http.post<any>(this.baseQuestionsUrl + 'PostQuestion', this.question);
  }
  getAllAnswers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseAnswersUrl + 'GetAnswers');
  }
  SendAnswer(): Observable<any> {
    return this.http.post<any>(this.baseAnswersUrl + 'PostAnswer', this.answer);
  }

}




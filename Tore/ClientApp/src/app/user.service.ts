import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { Question } from 'src/Models/Question';
import { Answer } from 'src/Models/Answer';
import { map } from 'rxjs/operators';
import { Specifi } from 'src/Models/Specifi';


@Injectable({ providedIn: 'root' })

export class UserService {

  public user: User = new User(0, "abc1724@gmail.com", "");
  Users: any[]=[];
  question: Question;
  answer: Answer;
  specifi:Specifi;
  questionList: Question[]=[];
  questionListShow: Question[]=[];
  answerList: Answer[]=[];
  answerListShow: any[]=[];
 specifisList:Specifi[]=[];
  indexOfQustion: number;
  pathSO: string;
  pathShas: string;
  pathRambam: string;
  currentPath: string;
  lastQuestionId:number;
  SA:Observable<Specifi>;
  flagSelectedPage:boolean=false;
  flagLastQuestion:boolean=false;
  baseUserUrl = "https://tore20210118023949.azurewebsites.net/api/Users/";
  baseQuestionsUrl = "https://tore20210118023949.azurewebsites.net/api/Questions/";
  baseAnswersUrl = "https://tore20210118023949.azurewebsites.net/api/Answers/";
  baseSpecifisUrl = "https://tore20210118023949.azurewebsites.net/api/Specifis/";



  baseUserUrl1 = "https://localhost:44307/api/Users/";
  baseQuestionsUrl1 = "https://localhost:44307/api/Questions/";
  baseAnswersUrl1 = "https://localhost:44307/api/Answers/";
  baseSpecifisUrl1 = "https://localhost:44307/api/Specifis/";

  
   httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
  specifisListSeifim: any[];



  constructor(private http: HttpClient) {
   }

  getAll(): Observable<any> {debugger
    return this.http.get<any>(this.baseUserUrl + 'GetUsers',this.httpOptions);
  }
  register(): Observable<User> {
    return this.http.post<User>(this.baseUserUrl + 'PostUser', this.user);
  }
  getAllQuestion(): Observable<any> {
    return this.http.get<any>(this.baseQuestionsUrl + 'GetQuestions',this.httpOptions);
  } 
  SendQuestion(): Observable<Question> {
    return this.http.post<Question>(this.baseQuestionsUrl + 'PostQuestion', this.question);
  }
  getAllAnswers(): Observable<any> {
    return this.http.get<any>(this.baseAnswersUrl + 'GetAnswers',this.httpOptions);
  }
  SendAnswer(): Observable<Answer> {debugger
    return this.http.post<Answer>(this.baseAnswersUrl + 'PostAnswer', this.answer);
  }
  getAllSpecifis(): Observable<any> {
    return this.http.get<any>(this.baseSpecifisUrl + 'GetSpecifis',this.httpOptions);
   }
  SendSpecifi(): Observable<Specifi> {debugger
  for(let s of this.specifisList){debugger
  return this.http.post<Specifi>(this.baseSpecifisUrl + 'PostSpecifi', s);
  }
}
  /////////////////////////////////////////////////////////////////////////////
//   getAll(): Observable<any> {debugger
//     return this.http.get<any>(this.baseUserUrl1 + 'GetUsers',this.httpOptions);
//   }
//   register(): Observable<User> {
//     return this.http.post<User>(this.baseUserUrl1 + 'PostUser', this.user);
//   }
//   getAllQuestion(): Observable<any> {
//     return this.http.get<any>(this.baseQuestionsUrl1 + 'GetQuestions',this.httpOptions);
//   } 
//   SendQuestion(): Observable<Question> {
//     return this.http.post<Question>(this.baseQuestionsUrl1 + 'PostQuestion', this.question);
    
//   }
//   getAllAnswers(): Observable<any> {
//     return this.http.get<any>(this.baseAnswersUrl1 + 'GetAnswers',this.httpOptions);
//   }
//   SendAnswer(): Observable<Answer> {debugger
//     return this.http.post<Answer>(this.baseAnswersUrl1 + 'PostAnswer', this.answer);
//  }
//  getAllSpecifis(): Observable<any> {
//   return this.http.get<any>(this.baseSpecifisUrl1 + 'GetSpecific',this.httpOptions);
// }
// SendSpecifi(): Observable<Specifi> {debugger
//   for(let s of this.specifisList){
//       return  this.http.post<Specifi>(this.baseSpecifisUrl1 + 'PostSpecifi', s);
//   }
// }
}





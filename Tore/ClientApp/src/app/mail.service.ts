import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/Models/Email';
import { Observable, of } from 'rxjs';
import { Specifi } from 'src/Models/Specifi';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  email: Email;
  selectedpage: string;
  selectedMaseches: string;
  selectedMasechesAndPages: string[]=[];
  ListMailsAndQuestionToSend:Specifi[]=[];
  selectedSOAndSeifim: any[]=[];
  constructor(private http: HttpClient) {
   }
  SendMail(): Observable<any> {
    debugger;
    return this.http.post<any>("https://localhost:44307/api/Mail/SendMail", this.email);
  }
  //  SendMail(): Observable<any> {
  //   debugger;
  //   return this.http.post<any>("https://tore20210118023949.azurewebsites.net/api/Mail/SendMail", this.email);
  // }
  // SendMailWithQuestion(): Observable<any> {
  //   debugger;
  //   return this.http.post<any>("https://localhost:44307/api/Mail/SendMailWithQuestion", this.email);
  // }
  //  SendMailWithQuestion(): Observable<any> {
  //   debugger;
  //   return this.http.post<any>("https://tore20210118023949.azurewebsites.net/api/Mail/SendMailWithQuestion", this.email);
  // }

}

















































































































































































































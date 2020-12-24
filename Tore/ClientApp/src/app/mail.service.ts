import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/Models/Email';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  email:Email;
  constructor(private http: HttpClient) { }
  SendMail():Observable<any>{debugger;
    return  this.http.post<any>("https://localhost:44307/api/Mail/SendMail" , this.email);
  
    }
}

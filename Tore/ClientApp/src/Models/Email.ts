export class Email {
    subject:string;
    body:string;
    address:string;
  
   constructor (subject: string, body: string, address: string) {
      this.subject = subject;
      this.body = body;
      this.address = address;
    }
  }
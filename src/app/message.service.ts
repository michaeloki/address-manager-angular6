import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  private subject = new Subject<any>();
 
  public sendMessage(message: string) {
      this.subject.next({ text: message });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}

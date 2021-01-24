import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();
  private language = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

  sendMessageLanguage(message: string) {
      this.language.next({ text: message });
  }

  clearMessagesLanguage() {
      this.language.next();
  }

  getMessageLanguage(): Observable<any> {
      return this.language.asObservable();
  }
}

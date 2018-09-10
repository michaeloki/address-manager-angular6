import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from  '@angular/common/http';
import { Http } from '@angular/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  API_URL  =  'http://localhost:3000';
  private addressResponse:any;

  
  constructor(private  httpClient:  HttpClient,public http: Http,
    private messageService: MessageService) {

  }

  getContacts(){
      return  this.httpClient.get(`${this.API_URL}/api/address`);
  }

  sendMessage(message): void {
    this.messageService.sendMessage(message);
}

clearMessage(): void {
    this.messageService.clearMessage();
}

  addContact(address) {
    this.http.post(`${this.API_URL}/api/address`,
    {
        "address": address
    })
    .subscribe(
        (val) => {   
                 this.sendMessage(val);               
        },
        response => {   
            this.sendMessage(response);           
        },
        () => {
            console.log("The POST observable is now completed.");
        });        
  }

  updateContact(contact) {
    let id = contact.id;
    let addr = contact.address;
this.http.put(`${this.API_URL}/api/address/${id}`,
    {
        "address": addr,
    })
    .subscribe(
        val => {
                        this.sendMessage(val);  
        },
        response => {
            this.sendMessage(response);  
        },
        () => {
            console.log("The PUT observable is now completed.");
        }
    );
  }

  deleteContact(contactId) {
    this.http.delete(`${this.API_URL}/api/address/${contactId}`)
    .subscribe(
        (val) => {    
                        this.sendMessage(val);               
        },
        response => {   
            this.sendMessage(response);           
        },
        () => {
            console.log("The delete observable is now completed.");
        }); 
  }
}

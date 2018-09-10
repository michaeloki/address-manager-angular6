import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service'; 
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private addressTitle = "My Addresses";
  private loading = false;
  private allCards = false;
  private editMode = false;
  message: any;
  subscription: Subscription;
  private address:string;
  private addressId:any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  private  contacts:  Array<object> = [];
constructor(private  apiService:  ApiService,private snackbar: MatSnackBar,
  private messageService: MessageService,private dialog: MatDialog) {
  this.subscription = this.messageService.getMessage().subscribe(message => { 
    this.message = message; 
    let responseObject = JSON.parse(message.text._body);
      this.snackbar.open(responseObject.message,'', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.getContacts();
  });
 }

ngOnInit() {
    this.getContacts();
}
 getContacts(){
  this.loading = true;
    //this.apiService.getContacts().subscribe((response:  Array<object>) => {
      this.apiService.getContacts().subscribe((response) => {
        
        var addressObject = JSON.stringify(response);
        let addr = JSON.parse(addressObject);
        if(addr.status === 'success') {
          this.contacts  =  addr.data;
          
          if (this.contacts.length > 0) {
            this.allCards = true;
            this.editMode = false;
            this.addressTitle = "My Addresses";
          } else {
            this.allCards = false;
          }
        } else {
          this.snackbar.open(addr.status,'', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.loading = false;
    });
}

private editContact() {

  if (this.address !== undefined) {
    this.loading = true;
    let contactObject = {"address":this.address,"id":this.addressId}
    this.apiService.updateContact(contactObject)
  }
}

private openEdit($event,element){
  this.addressTitle = element.physical_address;
  this.addressId = element.id;
  this.editMode = true;
  this.allCards = false;
}

private cancelEdit() {
  this.addressTitle = "My Addresses";
  this.editMode = false;
  this.allCards = true;
}

private deleteContact($event,element) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.data = { id: element.id};
  this.dialog.open(DeleteDialogComponent, dialogConfig);

}

}

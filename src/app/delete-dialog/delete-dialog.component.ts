import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from  '../api.service';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})


export class DeleteDialogComponent implements OnInit {
  message: any;
  subscription: Subscription;
  id:Number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DeleteDialogComponent>,private  apiService:  ApiService,
  private messageService: MessageService) {
    this.id = data.id;
   }
  address: string;

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close();
    if( this.id!==undefined && this.id!==null ) {
      this.apiService.deleteContact(this.id)
    }
  } 

}

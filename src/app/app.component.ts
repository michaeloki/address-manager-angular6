import { Component, ChangeDetectorRef, Inject, OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router  } from '@angular/router'; 
import {MediaMatcher} from '@angular/cdk/layout';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import {MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApiService } from  './api.service';
import { Subscription } from 'rxjs';
 
import { MessageService } from './message.service';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

export interface DialogData {
  address: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnDestroy {
  
  message: any;
  subscription: Subscription;
  mobileQuery: MediaQueryList;
  rootPage: any = HomeComponent;
  public pageTitle:string = 'Address Manager';
  homepage: any;
  nextEvent: any;
  categoryName: any;
  numberOfEvents: string;
  address:string;
  addressResponse:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(translate: TranslateService,private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public dialog: MatDialog,
    private  apiService:  ApiService,private snackbar: MatSnackBar,
    private messageService: MessageService,private homecomponent:HomeComponent){
    let defLng = 'en';
    translate.setDefaultLang(defLng);
    translate.use(defLng);
    translate.get('HOMEPAGE_TITLE').subscribe((res: string) => {
      this.homepage = res;
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.subscription = this.messageService.getMessage().subscribe(message => { 
      this.message = message; 
      let responseObject = JSON.parse(message.text._body);
        this.snackbar.open(responseObject.message,'', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

    });
  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }
  
  private _mobileQueryListener: () => void;

  openAddressBox(): void {

    const dialogConfig = new MatDialogConfig();
    if(this.address!==undefined) {
      this.address = "";
    }
    dialogConfig.data = { address: this.address};
    let dialogRef = this.dialog.open(AddressDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.address = value; 
      if (this.address !== undefined) {
        this.addNewContact(this.address);
      } 
    });
  }

  private addNewContact(address) {
      this.apiService.addContact(address)
  }

  private getContacts() {
    this.homecomponent.getContacts();
  }
  
  }
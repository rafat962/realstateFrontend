import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Matrials } from '../../matrial';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Cards_subscriptionComponent } from '../signup/cards_subscription/cards_subscription.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-OTP',
  templateUrl: './OTP.component.html',
  styleUrls: ['./OTP.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule,Matrials,CommonModule,FormsModule]
})
export class OTPComponent implements OnInit {

  constructor(private auth :AuthService,public dialog: MatDialog,) { }
  ngOnInit() {
    this.auth.getme().subscribe((data:any)=>{
      console.log(data)
    })
    this.auth.act.subscribe((data:any)=>{
      this.act=data
    })
  }
  // formfield
  otp= new FormControl('')
  act=''
  sendotp(){
    if(this.otp.valid){
      this.act='start'
      this.auth.active(this.otp.value)
    }
  }
    // ------- dialog ---------
    openDialog() {
      const dialogRef = this.dialog.open(Cards_subscriptionComponent);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }

}

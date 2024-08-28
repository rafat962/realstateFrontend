import { Matrials } from './../../matrial';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Cards_subscriptionComponent } from './cards_subscription/cards_subscription.component';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, Matrials, ReactiveFormsModule, RouterModule,FormsModule],
  animations: [
    trigger('divstate', [
      state(
        'normal',
        style({
          opacity: 0,
        })
      ),
      state(
        'new',
        style({
          opacity: 1,
        })
      ),
      transition('normal <=> new', animate(200)),
    ]),
  ],
})
export class SignupComponent implements OnInit {
  state = 'normal';
  myform!: FormGroup;
  constructor(public dialog: MatDialog, private auth: AuthService) {}

  ngOnInit() {
    setTimeout(() => {
      this.state = 'new';
    }, 200);
    this.myform = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.minLength(3), Validators.required],
      }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.minLength(4), Validators.required],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.minLength(4), Validators.required],
      }),
      phone: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required],
      }),
      role: new FormControl('user'),
    });
    this.auth.sin.subscribe((data:any)=>{
      this.sin=data
    })
  }

  // ------- dialog ---------
  openDialog() {
    const dialogRef = this.dialog.open(Cards_subscriptionComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // ------- senddata ---------
  sin = ''
  onsubmit() {
    if (this.myform.valid) {
      this.sin='start'
      this.auth.signup(
        this.myform.value.username,
        this.myform.value.email,
        this.myform.value.password,
        this.myform.value.confirmPassword,
        this.myform.value.phone,
        this.myform.value.role
      );
    }
  }



  SignupWithGoogle() {}
  SignupWithFacebook() {}
}

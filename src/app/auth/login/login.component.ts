import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Matrials } from '../../matrial';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Matrials,
    CommonModule,
    RouterModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
  ],
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
export class LoginComponent implements OnInit {
  myform!: FormGroup;
  stata = 'normal';
  user!: any;
  loggedIn!: any;
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(private auth: AuthService) {}
  ngOnInit() {
    setTimeout(() => {
      this.stata = 'new';
    }, 200);
    // ---------- form
    this.myform = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.min(3), Validators.required],
      }),
    });
    // --------- forget password ---------
    this.auth.rest.subscribe((data: any) => {
      this.reset = data;
    });
    this.auth.log.subscribe((data: any) => {
      this.log = data;
    });
  }
  log = '';
  onSubmit() {
    this.log = 'start';
    const btn = document.getElementById('next');
    btn?.classList.add('flex');
    btn?.classList.add('items-center');
    btn?.classList.add('justify-center');
    this.auth.login(this.myform.value.email, this.myform.value.password);
  }
  // --------- forget password ---------
  reset = '';
  forget() {
    this.reset = 'start';
    this.auth.reset1(this.myform.value.email);
  }
}

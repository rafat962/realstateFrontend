import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Cards_subscriptionComponent } from './signup/cards_subscription/cards_subscription.component';
import { ForgerPasswordComponent } from './forgerPassword/forgerPassword.component';
import { OTPComponent } from './OTP/OTP.component';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'subscription', component: Cards_subscriptionComponent },
  { path: 'forgetpassword/:id', component: ForgerPasswordComponent },
  { path: 'activate', component:OTPComponent }
];

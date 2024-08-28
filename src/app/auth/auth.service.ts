import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, pipe, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // ---------- Login ----------

  token!: string;
  log = new BehaviorSubject('');
  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    this.http
      .post(`${environment.apiUrl}user/login`, data)
      .pipe(
        catchError((error: any) => {
          // Optionally re-throw the error to propagate it to the next subscriber
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          this.toastr.success('Log in Successfully', '', {
            timeOut: 1000,
          });
          this.token = data.token;
          localStorage.setItem('token', this.token);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
          this.log.next('done');
        },
        (err: any) => {
          this.toastr.error(err);
          this.log.next('done');
        }
      );
  }

  // ---------- signup ----------
  sin = new BehaviorSubject('')
  signup(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: number,
    role: string
  ) {
    const data = {
      username: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phone,
      role: role,
    };
    console.log(data);
    this.http
      .post(`${environment.apiUrl}user/signup`, data)
      .pipe(
        catchError((error: any) => {
          console.log(2);
          // Optionally re-throw the error to propagate it to the next subscriber
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          this.toastr.success('Email activation has been sent', '', {
            timeOut: 1000,
          });
          this.token = data.token;
          localStorage.setItem('token', this.token);
          // this.router.navigate(['/']);
          this.sin.next('done')
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
  }

  // ---------- getme  ----------
  getme() {
    return this.http.get(`${environment.apiUrl}user/getme`);
  }

  // ---------- resetPassword1  ----------
  rest = new BehaviorSubject('');
  reset1(email: any) {
    console.log(email);
    this.http
      .post(`${environment.apiUrl}user/resetPassword`, { email: email })
      .pipe(
        catchError((error: any) => {
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.success('Check your Email');
          this.rest.next('done');
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
  }
  reset2(password: any, confirmPassword: any, token: any) {
    const data = {
      password: password,
      confirmPassword: confirmPassword,
    };
    this.http
      .patch(`${environment.apiUrl}user/resetPassword2/${token}`, data)
      .pipe(
        catchError((err: any) => {
          return throwError(err.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.success('your password changed successfully');
          this.router.navigate(['/auth/login']);
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
  }

 // ---------- active ----------
  act = new BehaviorSubject('')
  active(otp:any){
    this.getme().subscribe((data:any)=>{
      console.log(data.user.role)
      if(data.user.role==='user'){
        this.http.post(`${environment.apiUrl}user/active`,{
          otp:otp
        }).pipe(catchError((error:any)=>{
          return throwError(error.error.message)
        })).subscribe((data:any)=>{
          this.toastr.success('activaton done','Welcom To Our Community')
          this.router.navigate(['/'])
          this.act.next('done')
        },(err:any)=>{
          this.toastr.error(err)
          this.act.next('')
        })
      }else{
        this.http.post(`${environment.apiUrl}user/active`,{
          otp:otp
        }).pipe(catchError((error:any)=>{
          return throwError(error.error.message)
        })).subscribe((data:any)=>{
          this.toastr.success('activaton done','Chose you package')
          this.act.next('done')
        },(err:any)=>{
          this.toastr.error(err)
          this.act.next('')
        })
      }
    })
  }

  // ---------- payment ----------

  payment(packag:any){
    console.log(packag)
    this.http.post(`${environment.apiUrl}user/payment`,{packages:packag}).pipe(catchError((error:any)=>{
      return throwError(error.error.message)
    })).subscribe((data:any)=>{
      window.location.href=data.message
    },(err:any)=>{
      this.toastr.error(err)
    })
  }


  // ---------- SET PACKAGE ----------

  setpackage(packages:any,id:any){
    this.http.patch(`${environment.apiUrl}user/${id}`,{packages:packages}).subscribe((data)=>{
      console.log(1)
      console.log(data)
    })
  }


}

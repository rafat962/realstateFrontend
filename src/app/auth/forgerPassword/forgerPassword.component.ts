import { Component, OnInit } from '@angular/core';
import { Matrials } from '../../matrial';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgerPassword',
  templateUrl: './forgerPassword.component.html',
  styleUrls: ['./forgerPassword.component.css'],
  standalone: true,
  imports: [Matrials, ReactiveFormsModule, CommonModule],
})
export class ForgerPasswordComponent implements OnInit {
  myform!: FormGroup;
  token!: any;
  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.myform = new FormGroup({
      password: new FormControl('', { validators: [Validators.minLength(4)] }),
      ConfirmPassword: new FormControl('', {
        validators: [Validators.minLength(4)],
      }),
    });
    this.route.paramMap.subscribe((params: any) => {
      this.token = params.params.id;
    });
  }
  reset() {
    if (this.myform.valid) {
      console.log(this.myform.value);
      this.auth.reset2(
        this.myform.value.password,
        this.myform.value.ConfirmPassword,
        this.token
      );
    }
  }
}

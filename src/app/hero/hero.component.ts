import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountUpDirective } from '../shared/count_up.directive';
import { Matrials } from '../matrial';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CountUpDirective,
    Matrials,
    FooterComponent,
    HeaderComponent,
    RouterModule
  ],
})
export class HeroComponent implements OnInit {
  constructor(private router:ActivatedRoute,private auth:AuthService) {}

  ngOnInit() {
    this.router.queryParams.subscribe((params:any)=>{
      const userID = params['user']
      const packages = params['packages']
      console.log(userID,packages)
      this.auth.setpackage(packages,userID)
    })
  }
}

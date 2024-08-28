import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // ---- menu
  openToggle() {
    document.getElementById('toggle')?.classList.toggle('open');
    document.getElementById('mobile_list')?.classList.toggle('translate-x-0');
  }
  sidedisapper() {
    document.getElementById('mobile_list')?.classList.remove('translate-x-0');
    document.getElementById('toggle')?.classList.toggle('open');
  }
}

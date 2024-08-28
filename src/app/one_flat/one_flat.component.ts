import { Component, OnInit } from '@angular/core';
import { Flat_headerComponent } from '../shared/flat_header/flat_header.component';
import { Flate_serviceService } from '../all_flats/flate_service.service';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { Flat } from '../all_flats/flat';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-one_flat',
  templateUrl: './one_flat.component.html',
  styleUrls: ['./one_flat.component.css'],
  standalone:true,
  imports:[Flat_headerComponent,RouterModule]
})
export class One_flatComponent implements OnInit {

  constructor(private service:Flate_serviceService,private router:ActivatedRoute) { }
  flat!:Flat
  flatID!:any;
  api:any = environment.apiUrl2
  ngOnInit() {
    this.router.paramMap.subscribe((params:any)=>{
      this.flatID = params.params.id
    })
    this.service.getOne(this.flatID).subscribe((data:any)=>{
      this.flat = data.result.units
    })
  }

}

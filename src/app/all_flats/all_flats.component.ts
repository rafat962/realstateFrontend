import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Matrials } from '../matrial';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatChipOption } from '@angular/material/chips';
import { Flate_serviceService } from './flate_service.service';
import { environment } from '../../environments/environment.development';
import { MapComponent } from './map/map.component';
import { Flat_headerComponent } from '../shared/flat_header/flat_header.component';

@Component({
  selector: 'app-all_flats',
  templateUrl: './all_flats.component.html',
  styleUrls: ['./all_flats.component.css'],
  standalone:true,
  imports:[Matrials,AsyncPipe,ReactiveFormsModule,CommonModule,RouterModule,FormsModule,MapComponent,Flat_headerComponent]
})
export class All_flatsComponent implements OnInit {


  // ----------- API -----------
  api:any = environment.apiUrl2
  // ----------- Inputs -----------
  location!:any;
  plantype:any='Buy'
  unitType:any = 'Apartment'
  bedrooms:any=''
  baths:any=''
  minPrice:any=0
  maxPrice:any=1000000000
  minSqr:any=''
  maxSqr:any=''
  Keyword!:any;
  agency:any=''
  spin = true
  send(type:string,arrow:string){
    this.spin = true
    // send data
    console.log(this.location,'-plantype',this.plantype,'-unitType',this.unitType,'-bedrooms',
    this.bedrooms,'-baths',this.baths,'-minprice',this.minPrice,'-maxprice',this.maxPrice,'-minsqr',
    this.minSqr,'-maxsqr',this.maxSqr,'-keyword',this.Keyword,'-agency',this.agency)
    // close taps
    document.getElementById(arrow)?.classList.toggle('bxs-chevron-up')
    document.getElementById(type)?.classList.toggle('hidden')
    const params = {
      type: this.unitType,
      Purpose: this.plantype,
      'price[gte]': this.minPrice,
      'price[lte]': this.maxPrice,
      bedrooms: this.bedrooms,
      pathrooms: this.baths,
      'area[gte]': this.minSqr,
      'area[lte]': this.maxSqr,
      developer: this.agency,
    };

    const filterarray = Object.entries(params).filter(([key,value])=>value !=='')
    const finalarray=[]
    for(const [key,value] of filterarray){
      finalarray.push(`${key}=${value}`)
    }
    const quary = finalarray.join('&')
    console.log(quary);
    this.http.getall(quary);
  }
  // ----------- Inputs functions -----------
  typeOfPlan(type:string){
    this.plantype = type
    document.getElementById('optiontype')?.querySelectorAll('button').forEach((btn)=>{
      if(btn.textContent===type){
        btn.classList.add('bg-blue-300')
      }else{
        btn.classList.remove('bg-blue-300')
      }
    })
    this.spin = true
  }
  typeOfPlan2(type:string){
    this.plantype = type
    document.getElementById('optiontype2')?.querySelectorAll('button').forEach((btn)=>{
      if(btn.textContent===type){
        btn.classList.add('bg-blue-300')
      }else{
        btn.classList.remove('bg-blue-300')
      }
    })
  }
  typeOfunit(type:string){
    this.unitType = type
    this.http.flatType.next(type)
  }
  sendunit(){
    console.log('send')
  }
  @ViewChild('Bedslist') Bedchip!:any;
  extractSelectedValue() {
    const selectedValue = this.Bedchip.value;
    this.bedrooms = selectedValue
  }
  @ViewChild('Baths') Baths!:any;

  extractBaths(){
    this.baths = this.Baths.value
    console.log(this.baths)
  }
  resetprice(){
    this.minPrice= 0
    this.maxPrice= 1000000000
    this.send('','')
  }
  resetfillters(){
    this.minSqr = 0
    this.maxSqr = 400
    this.Keyword = ''
    this.agency = ''
  }
  @ViewChild('bathselect') bathselect!:MatChipOption;
  @ViewChild('bedselected') bedselected!:MatChipOption;
  resetbeds(){
    if(this.bathselect){
      this.bathselect.selected = true
    }
    if(this.bedselected){
      this.bedselected.selected = true
    }
    this.bedrooms = 3
    this.baths = 1
  }
  // --------------------------------------------
  constructor(private toster:ToastrService, private http:Flate_serviceService) { }


  allflats:any = []
  appear = 'list'
  appearClick(type:any){
    if(type === 'list'){
      this.appear = 'list'
      const body = document.getElementById('body')
      body?.classList.remove('w-full')
      body?.classList.add('max-w-7xl')
      body?.classList.add('space-y-6')
    } else{
      this.appear = 'map'
      const body = document.getElementById('body')
      body?.classList.add('w-full')
      body?.classList.remove('max-w-7xl')
      body?.classList.add('space-y-1')
    }
  }
  ngOnInit() {
    this.http.appear.subscribe((data:any)=>{
      this.appear = data
      if(data === 'list'){
        const body = document.getElementById('body')
        body?.classList.remove('w-full')
        body?.classList.add('max-w-7xl')
        body?.classList.add('space-y-6')
      }
    })
    if(this.appear === 'list'){
      const body = document.getElementById('body')
      body?.classList.remove('w-full')
      body?.classList.add('max-w-7xl')
      body?.classList.add('space-y-6')
    }else{
      const body = document.getElementById('body')
      body?.classList.add('w-full')
      body?.classList.remove('max-w-7xl')
      body?.classList.add('space-y-1')
    }

    // ---- get all flats ----

    this.http.getall('')
    this.http.allflats.subscribe((data:any)=>{
      this.allflats = data
      if(this.allflats.length===0){
        this.spin= true
      }else{

        this.spin = false
      }
    })
  }


  // ---------- vanila js ----------
  openTypeMenu(){
    // ----- delete all toggles
    document.getElementById('arrow2')?.classList.remove('bxs-chevron-up')
    document.getElementById('inbeds')?.classList.add('hidden')
    document.getElementById('arrow3')?.classList.remove('bxs-chevron-up')
    document.getElementById('inprice')?.classList.add('hidden')
    document.getElementById('arrow4')?.classList.remove('bxs-filter-alt')
    document.getElementById('infilter')?.classList.add('hidden')
    //------
    document.getElementById('arrow')?.classList.toggle('bxs-chevron-up')
    document.getElementById('intype')?.classList.toggle('hidden')
  }
  openbedsMenu(){
        // ----- delete all toggles
        document.getElementById('arrow')?.classList.remove('bxs-chevron-up')
        document.getElementById('intype')?.classList.add('hidden')
        document.getElementById('arrow3')?.classList.remove('bxs-chevron-up')
        document.getElementById('inprice')?.classList.add('hidden')
        document.getElementById('arrow4')?.classList.remove('bxs-filter-alt')
        document.getElementById('infilter')?.classList.add('hidden')
        //------
    document.getElementById('arrow2')?.classList.toggle('bxs-chevron-up')
    document.getElementById('inbeds')?.classList.toggle('hidden')
  }
  openpriceMenu(){
      // ----- delete all toggles
      document.getElementById('arrow')?.classList.remove('bxs-chevron-up')
      document.getElementById('intype')?.classList.add('hidden')
      document.getElementById('arrow2')?.classList.remove('bxs-chevron-up')
      document.getElementById('inbeds')?.classList.add('hidden')
      document.getElementById('arrow4')?.classList.remove('bxs-filter-alt')
      document.getElementById('infilter')?.classList.add('hidden')
      //------
    document.getElementById('arrow3')?.classList.toggle('bxs-chevron-up')
    document.getElementById('inprice')?.classList.toggle('hidden')
  }
  openfilterMenu(){
      // ----- delete all toggles
      document.getElementById('arrow')?.classList.remove('bxs-chevron-up')
      document.getElementById('intype')?.classList.add('hidden')
      document.getElementById('arrow2')?.classList.remove('bxs-chevron-up')
      document.getElementById('inbeds')?.classList.add('hidden')
      document.getElementById('arrow3')?.classList.remove('bxs-chevron-up')
      document.getElementById('inprice')?.classList.add('hidden')
      //------
    document.getElementById('arrow4')?.classList.toggle('bxs-filter-alt')
    document.getElementById('infilter')?.classList.toggle('hidden')
  }
  expand = 'View More'
  expandrecommindation(){
    const rec = document.getElementById('reco')
    if(this.expand === 'View More'){
      rec?.classList.toggle('md:max-h-fit')
      rec?.classList.toggle('lg:max-h-fit')
      this.expand = 'View Less'
      console.log(1)
    }else{
      console.log(2)
      this.expand = 'View More'
      rec?.classList.toggle('md:max-h-fit')
      rec?.classList.toggle('lg:max-h-fit')
    }
  }

  stick(){
    const drive = document.getElementById('drive')
    if(window.scrollY > 50){
      drive?.classList.add('sticky')
    }
  }


}

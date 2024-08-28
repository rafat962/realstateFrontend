import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Flate_serviceService {

constructor(private http:HttpClient) { }

  // ---------- type of flat
  flatType = new BehaviorSubject('Apartments')
  appear = new BehaviorSubject('list')
  // -------------- get all flats data --------------
  allflats = new BehaviorSubject([])
  getall(params:any){
    if(params){
      console.log(params)
      this.http.get(`${environment.apiUrl}unit?${params}`).subscribe((data:any)=>{
        this.allflats.next(data.result.units)
      })
    }else{
      this.http.get(`${environment.apiUrl}unit`).subscribe((data:any)=>{
        this.allflats.next(data.result.units)
      })
    }
    }

    getOne(id:any){
      return this.http.get(`${environment.apiUrl}unit/${id}`)
    }


}

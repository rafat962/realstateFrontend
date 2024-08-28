import { Component, Inject, OnInit } from '@angular/core';
import { Matrials } from '../../../matrial';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cards_subscription',
  templateUrl: './cards_subscription.component.html',
  styleUrls: ['./cards_subscription.component.css'],
  standalone: true,
  imports: [Matrials,RouterModule],
})
export class Cards_subscriptionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toster:ToastrService,
    private auth:AuthService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
  sendpackage(pack:any){
    if(pack==='free'){
      this.toster.success('you are now on free package')
    }else{
      this.auth.payment(pack)
    }
  }
}

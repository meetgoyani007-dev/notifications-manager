import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  invitationData:any = [];
  user_id:string;
  constructor(private dataService: DataService, private router: Router) {
    this.user_id = localStorage.getItem("u_id")
   }

  ngOnInit(): void {
    this.getInvitationsdata().then((result:any) => {
      this.invitationData = result.filter((invite:any) => {
        return invite.user_id === this.user_id;
      });
    });
    setTimeout(()=>{
      this.appendInvitaions();
    }, 2000);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getInvitationsdata(): Promise<any> {
    return new Promise((resolve) => {
      if (this.invitationData.length != 0) {
        resolve(this.invitationData);
      } else {
        this.dataService.get('./assets/json/invitations.json').subscribe((response: any) => {
          resolve(response.invites);
        });
      }
    });
  }

  getUpdateInvitationData(): Promise<any> {
    return new Promise((resolve) => {
        this.dataService.get('./assets/json/invitations_update.json').subscribe((response: any) => {
          resolve(response.invites);
        });
    });
  }

  appendInvitaions(){
    this.getUpdateInvitationData().then((result:any) => {
      let updatedInvites:any = result.filter((invite:any) => {
        return invite.user_id === this.user_id;
      });
      console.log(updatedInvites);
      let cnt = 0;
      let maxLen = updatedInvites.length - 1;
        var inerval = setInterval(() => {
          this.invitationData.push(updatedInvites[cnt]);
          cnt++;
          if(cnt == maxLen){
            clearInterval(inerval);
          }
        }, 5000);  
    })
  }

}

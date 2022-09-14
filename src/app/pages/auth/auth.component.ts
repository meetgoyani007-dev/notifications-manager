import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userData: any = [];
  email: string = "";
  password: string = "";

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    if (this.email && this.password) {
      this.getUserdata().then((result) => {
        console.log(result);
        this.userData = result;
        let user = this.userData.find((user: any) => { return user.email == this.email });
        if (user) {
          if (user.password === this.password) {
            this.setErrorMsg("");
            localStorage.setItem("u_id",user.user_id.toString());
            localStorage.setItem("ps",btoa(user.password));
            this.router.navigate(['/listing']);
          } else {
            this.setErrorMsg("Invalid Login Details");
          }
        } else {
          this.setErrorMsg("Invalid Login Details");
        }
      });
    } else {
      this.setErrorMsg("Login Details are required");
    }
  }

  setErrorMsg(message: string) {
    document.getElementById("errorMsg").innerText = message;
  }

  getUserdata(): Promise<any> {
    return new Promise((resolve) => {
      if (this.userData.length != 0) {
        resolve(this.userData);
      } else {
        this.dataService.get('./assets/json/users.json').subscribe((response: any) => {
          resolve(response.users);
        });
      }
    });
  }

}

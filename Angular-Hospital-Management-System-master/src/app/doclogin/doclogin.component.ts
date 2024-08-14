import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-doclogin',
  templateUrl: './doclogin.component.html',
  styleUrls: ['./doclogin.component.css']
})
export class DocloginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false



  constructor(private router: Router, public loginservice: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin() {
    let request = {
      email: this.username,
      password: this.password
    }
    console.log(request)
    if (this.username == '' || this.password == '') {
      alert("Please fill all required fields");
    } else {
      this.loginservice.login(request).subscribe(data => {
        console.log(data);
        if (data.statusCode == 200) {
          console.log(data.result.userType)
          const type=data.result.userType

          if(type=="Doctor"){
            sessionStorage.setItem('docId',data.result.userId)
            this.router.navigate(['doctors'])
          }else{
            sessionStorage.setItem('patientId',data.result.userId)
            this.router.navigate(['patientLogin'])
          }
        } else {
          alert("Wrong Credentials");
        }
      })
    }



    // if (this.loginservice.authenticate(this.username, this.password)
    // ) {
    //   this.router.navigate(['docdash'])

    //   this.invalidLogin = false
    // } else {
    //   this.invalidLogin = true
    //   alert("Wrong Credentials");
    // }

  }



}

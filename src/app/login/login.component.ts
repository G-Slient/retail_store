import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { Router } from '@angular/router'
import { RealTimeService } from './abc';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login :Login = new Login;
  realTime :RealTimeService[];

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

  onSubmit1():void{

    if(this.login.userName=='apple'&& this.login.password=='apple')
    {
      Cookie.set('userInfo',JSON.stringify(this.login));
      if (Cookie.get('tasksmanagementurl') !== null) {
                   
        window.location.href = Cookie.get('tasksmanagementurl');
      } else {
        this.router.navigate(['main']);
      }

    }

  }





}

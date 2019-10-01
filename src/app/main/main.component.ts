import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    if(this.router.url=='/main')
    {
      this.router.navigate(['addtasks'])
    }
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
  


}

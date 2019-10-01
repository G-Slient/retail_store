import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthGuard implements CanActivate {



    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Cookie.get('userInfo') === null) {
          var url=window.location.href;
          var split=url.split("/");
          if(split[split.length-1].split("?")[0]=='tasksmanagement')
          {
            Cookie.set("tasksmanagementurl",window.location.href);
          }
          
            this.router.navigate(['/']);
            return false;
          } else {
          
            return true;
          }
    }
}

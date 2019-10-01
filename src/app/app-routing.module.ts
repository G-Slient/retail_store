import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { MainComponent} from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { AddtasksComponent} from './addtasks/addtasks.component';
import { ListtasksComponent } from './listtasks/listtasks.component';
import { LogoutComponent } from './logout/logout.component';
import { PasttasksComponent } from './pasttasks/pasttasks.component';

const routes: Routes = [
  { path: '', component: LoginComponent,pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'addtasks', component: AddtasksComponent, canActivate: [AuthGuard] },
  { path: 'listtasks', component: ListtasksComponent, canActivate: [AuthGuard] },
  { path: 'pasttasks', component: PasttasksComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { AddtasksComponent } from './addtasks/addtasks.component';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import { ListtasksComponent } from './listtasks/listtasks.component';
import { LogoutComponent } from './logout/logout.component';
import { CommonService } from './common.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from './auth.request.options';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BackgroundColorDirective } from './background-color.directive';
import { PasttasksComponent } from './pasttasks/pasttasks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AddtasksComponent,
    ListtasksComponent,
    LogoutComponent,
    BackgroundColorDirective,
    PasttasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DatePickerModule,
    ReactiveFormsModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},AuthGuard,CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

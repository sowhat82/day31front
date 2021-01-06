import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { MainComponent } from './components/main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ErrorComponent } from './components/error.component';
import { CanLeaveService } from './can-leave.service';

const ROUTES: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'main', component: MainComponent, canActivate: [AuthService], canDeactivate: [CanLeaveService] }, //canActivate is a route guard
	{ path: 'error', component: ErrorComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(ROUTES), FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [AuthService, CanLeaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }

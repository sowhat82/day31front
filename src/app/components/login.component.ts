import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ""
  loginForm : FormGroup

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })


  }

  async login(){

    if (await this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value)){
      this.router.navigate(['/main'])
    }


  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  mainForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.mainForm = this.fb.group({
      text: this.fb.control('', [Validators.required]),
    })

  }

  submit(){

  }

  canILeave(){
    return(!this.mainForm.dirty)
  }

}

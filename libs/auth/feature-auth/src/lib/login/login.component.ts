import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
 
@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiLabelModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() clickedSignup: EventEmitter<void> = new EventEmitter();
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  signUpClicked() {
    this.clickedSignup.next();
  }

  login() {
    console.log('clicked login');
  }

}

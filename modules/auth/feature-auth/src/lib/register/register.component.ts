import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TuiInputModule, TuiButtonModule, TuiInputPasswordModule,
    TuiTextfieldControllerModule, TuiLabelModule, TuiFieldErrorPipeModule, TuiErrorModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required!'
      },
    },
  ]
})
export class RegisterComponent implements OnInit {
  @Output() clickedLogin: EventEmitter<void> = new EventEmitter();
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required],
      ),
    }, { validators: this.confirmPasswordValidator });
  }

  passwordValidator(password: AbstractControl): Validators | null {
    if (password.value.length < 8) {
      return {
        other: 'Password must be at least 8 characters!',
      }
    }
    if (!password.value.match(/\d/) || !password.value.match(/[a-zA-Z]/)) {
      return {
        other: 'Password must contain at least 1 letter and 1 number',
      };
    }
    return null;
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true } : null;
  };

  loginClicked() {
    this.clickedLogin.next();
  }

  register() {
    console.log('clicked register');
  }
}

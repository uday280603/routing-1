import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from '../../service/auth.service';
import { SanckbarService } from '../../service/snackbar.service';
import { RowOutlet } from '@angular/cdk/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isAllReadyHasAccoount: boolean = false;
  signUpForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(
    private _autService: AuthService,
    private _sanckbar: SanckbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.onCreateSignUpform();
    this.onCreateLogInForm();
  }

  onCreateSignUpform() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
    });
  }
  onCreateLogInForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      let loginDetails = { ...this.loginForm.value };
      this._autService.logIn(loginDetails).subscribe({
        next: (data) => {
          console.log(data);
          this._sanckbar.openSnackbar(data.message);
          this._autService.saveToken(data.token)
          this._autService.saveUser(data.userRole)
          this._router.navigate(['home']);
        },
        error: (err) => {
          this._sanckbar.openSnackbar(err.error.message);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  onSignInUser() {
    if (this.signUpForm.valid) {
      let userDeatils = { ...this.signUpForm.value };
      this._autService.signUp(userDeatils).subscribe({
        next: (data) => {
          console.log(data);
          this._sanckbar.openSnackbar(`sign in successfully..!`);
          this.isAllReadyHasAccoount = true;
        },
      });
    }
  }
}

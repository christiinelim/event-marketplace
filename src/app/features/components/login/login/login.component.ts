import { Component, OnInit, inject } from '@angular/core';
import { FeaturesModule } from '../../../features.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FeaturesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  
  loginForm!: FormGroup;
  error: boolean = false;
  displaySuccess: boolean = false;
  successMessage: string = "";
  errorMessage: string = "";

  ngOnInit(): void {
    const state = window.history.state;
    if (state) {
      if (state.displaySuccess) {
        this.displaySuccess = state.displaySuccess;
        this.successMessage = state.successMessage;
      } else if (state.error) {
        this.error = state.error;
        this.errorMessage = state.errorMessage;
      }
    }

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  onSubmit(formData: any){
      const { email, password } = formData;
      if (!email || !password) {
        this.error = true;
        this.errorMessage = "Please fill up both fields"
      } else {
        this.authService.login(email, password).subscribe(() => {
            this.router.navigateByUrl('/dashboard');
          }, (error) => {
            this.error = true;
            this.errorMessage = "Invalid email or password";
          }
        );
      }
  }

  navigateToSignup() {
    this.router.navigateByUrl("/signup")
  }

  navigateToForgotPassword() {
    this.router.navigateByUrl("/")
  }
}

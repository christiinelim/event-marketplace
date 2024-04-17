import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeaturesModule } from '../../../features.module';
import { passwordValidator } from '../../../../shared/validators/password.validator';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [FeaturesModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  authService = inject(AuthService);
  router = inject(Router);
  
  passwordUpdateForm!: FormGroup;
  error: boolean = false;
  confirmPasswordInvalid: boolean = false;
  errorMessage: string = "";

  ngOnInit(): void {
    this.passwordUpdateForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, passwordValidator()]),
      confirmPassword: new FormControl("", [Validators.required]),
    })
  }

  onSubmit(formData: any){
    const { email, password } = formData;
    this.authService.updatePasswordByEmail(email, password).subscribe((response) => {
      this.router.navigateByUrl('/')
    }, (error) => {
      this.error = true;
      this.errorMessage = "Error changing password"
    })
  }

  navigateToSignup() {
    this.router.navigateByUrl("/signup")
  }

  navigateToLogin() {
    this.router.navigateByUrl("/login")
  }

  // check password and confirm password match
  checkConfirmPassword() {
    const passwordControl = this.passwordUpdateForm.get('password')?.value;
    const confirmPasswordControl = this.passwordUpdateForm.get('confirmPassword')?.value;

    if (passwordControl && confirmPasswordControl) {
      this.confirmPasswordInvalid = passwordControl !== confirmPasswordControl;
    }
  }
}

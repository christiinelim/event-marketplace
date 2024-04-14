import { Component, OnInit, inject } from '@angular/core';
import { FeaturesModule } from '../../../features.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { contactValidator } from '../../../../shared/validators/contact.validator';
import { websiteValidator } from '../../../../shared/validators/website.validator';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { Profile } from '../../../../core/models/profile/profile.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FeaturesModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit {
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  router = inject(Router);
  
  signupForm!: FormGroup;
  confirmPasswordInvalid: boolean = false;

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, passwordValidator()]),
      confirmPassword: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      website: new FormControl("", [Validators.required, websiteValidator()]),
      contact: new FormControl("", [Validators.required, contactValidator()])
    })
  }

  onSubmit(formData: any){
    const { email, password, username, website, contact } = formData;
    this.authService.signup(email, password, username).subscribe((id: string) => {
        const newProfile: Profile = { id, website, contact };
        this.profileService.createProfile(newProfile).subscribe(() => {
            this.router.navigateByUrl('/login', { state: { displaySuccess: true, successMessage: "Sign up success, you may now proceed to login" } });
          }, (profileError) => {
            console.error('Profile creation error:', profileError);
          }
        );
      }, (signupError) => {
        console.error('Signup error:', signupError);
      }
    );        
  }

  // check password and confirm password match
  checkConfirmPassword() {
    const passwordControl = this.signupForm.get('password')?.value;
    const confirmPasswordControl = this.signupForm.get('confirmPassword')?.value;

    if (passwordControl && confirmPasswordControl) {
      this.confirmPasswordInvalid = passwordControl !== confirmPasswordControl;
    }
  }

  // navigate to login
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}

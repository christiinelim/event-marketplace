import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-landing',
  standalone: true,
  imports: [],
  templateUrl: './navbar-landing.component.html',
  styleUrl: './navbar-landing.component.css'
})

export class NavbarLandingComponent {
  router = inject(Router);

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToSignup() {
    this.router.navigateByUrl('/signup');
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  router = inject(Router);
  authService = inject(AuthService);

  isProfileOpen: boolean = false;

  toggleProfileMenu(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
        this.router.navigateByUrl('/login');
      }, (error) => {
        console.error('Logout error:', error);
      }
    );
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}

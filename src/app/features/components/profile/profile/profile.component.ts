import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { User } from '../../../../core/models/user/user.model';
import { Profile } from '../../../../core/models/profile/profile.model';
import { ProfileService } from '../../../../core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  profileServie = inject(ProfileService);

  user: User | null = null;
  profile: Profile | null = null;

  ngOnInit(): void {
    this.authService.getUser().subscribe((response) => {
      this.user = response;
      console.log(this.user)
    });

    this.profileServie.getProfileByUid().subscribe((response) => {
      this.profile = response;
      console.log(this.profile)
    })
  }
}

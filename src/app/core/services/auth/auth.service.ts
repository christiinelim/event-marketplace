import { Injectable, inject, signal } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, from, map } from 'rxjs';
import { User } from '../../models/user/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  cookieService = inject(CookieService);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined);

  signup(email: string, password: string, username: string): Observable<string> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential: UserCredential) => {
        const { uid } = userCredential.user; 
        return updateProfile(userCredential.user, { displayName: username })
          .then(() => uid); 
      });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.cookieService.set('userId', user.uid);
        } else {
          throw new Error('User not found');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      })
      return from(promise);
  }

  logout(): void {
    this.cookieService.delete('userId');
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }
}
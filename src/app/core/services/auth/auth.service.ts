import { Injectable, inject, signal } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Observable, from, map } from 'rxjs';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined)

  
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
      .then(() => {});
      return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
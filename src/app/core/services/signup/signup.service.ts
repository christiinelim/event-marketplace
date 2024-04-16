import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Signup } from '../../models/signup/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  firestore = inject(Firestore);
  signupsCollection = collection(this.firestore, 'signups');

  getSigns(): Observable<Signup[]> {
    return collectionData(this.signupsCollection, {
      idField: 'uid',
    }) as Observable<Signup[]>;
  }

  getSignupsByEventUid(eventId: string): Observable<Signup[]> {
    const q = query(this.signupsCollection, where("eventId", "==", eventId));

    return new Observable<Signup[]>((observer) => {
      getDocs(q).then((querySnapshot) => {
        const signups: Signup[] = [];
        querySnapshot.forEach((doc) => {
          signups.push({ uid: doc.id, ...doc.data() } as Signup);
        });
        observer.next(signups);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  getSignupByUid(signupId: string): Observable<Signup> {
    const q = query(this.signupsCollection, where("__name__", "==", signupId));

    return new Observable<Signup>((observer) => {
      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const eventData = { uid: doc.id, ...doc.data() } as Signup;
          observer.next(eventData);
        } else {
            observer.next();
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  createSignup(newSignup: Signup): Observable<string> {
    const promise = addDoc(this.signupsCollection, newSignup).then(
      (response) => response.id
    );
    return from(promise);
  }

  updateSignup(signupId: any, updatedSignup: Signup): Observable<void> {
    const docRef = doc(this.signupsCollection, signupId);
    const promise = setDoc(docRef, updatedSignup);
    return from(promise);
  }

  deleteSignup(signupId: string): Observable<void> {
    const docRef = doc(this.signupsCollection, signupId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}

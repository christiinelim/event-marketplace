import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Profile } from '../../models/profile/profile.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  firestore = inject(Firestore);
  profileCollection = collection(this.firestore, 'profile');

  getProfiles(): Observable<Profile[]> {
    return collectionData(this.profileCollection, {
      idField: 'id',
    }) as Observable<Profile[]>;
  }

  createProfile(newProfile: Profile): Observable<string> {
    const promise = addDoc(this.profileCollection, newProfile).then(
      (response) => response.id
    );
    return from(promise);
  }

  deleteProfile(profileId: string): Observable<void> {
    const docRef = doc(this.firestore, 'profile/' + profileId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}

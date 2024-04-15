import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Profile } from '../../models/profile/profile.model';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  firestore = inject(Firestore);
  cookieService = inject(CookieService);
  profileCollection = collection(this.firestore, 'profile');

  getProfiles(): Observable<Profile[]> {
    return collectionData(this.profileCollection, {
      idField: 'id',
    }) as Observable<Profile[]>;
  }

  getProfileByUid(): Observable<Profile> {
    const userId = this.cookieService.get('userId');
  
    const q = query(this.profileCollection, where("userId", "==", userId));

    return new Observable<Profile>((observer) => {
      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const profileData = { ...doc.data() } as Profile;
          observer.next(profileData);
        } else {
            observer.next();
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
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

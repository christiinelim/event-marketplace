import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Event } from '../../models/event/event.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  firestore = inject(Firestore);
  cookieService = inject(CookieService);
  eventsCollection = collection(this.firestore, 'events');

  getEvents(): Observable<Event[]> {
    return collectionData(this.eventsCollection, {
      idField: 'id',
    }) as Observable<Event[]>;
  }

  getEventsByUid(): Observable<Event[]> {
    const userId = this.cookieService.get('userId');
  
    const q = query(this.eventsCollection, where("userId", "==", userId));

    return new Observable<Event[]>((observer) => {
      getDocs(q).then((querySnapshot) => {
        const events: Event[] = [];
        querySnapshot.forEach((doc) => {
          events.push({ uid: doc.id, ...doc.data() } as Event);
        });
        observer.next(events);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  getEventsByEventUid(eventUid: string): Observable<Event> {
  
    const q = query(this.eventsCollection, where("__name__", "==", eventUid));

    return new Observable<Event>((observer) => {
      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const eventData = { uid: doc.id, ...doc.data() } as Event;
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

  createEvent(newEvent: Event): Observable<string> {
    const promise = addDoc(this.eventsCollection, newEvent).then(
      (response) => response.id
    );
    return from(promise);
  }

  updateEvent(eventId: string, updatedEvent: Event): Observable<void> {
    const docRef = doc(this.eventsCollection, eventId);
    const promise = setDoc(docRef, updatedEvent);
    return from(promise);
  }

  deleteEvent(eventId: string): Observable<void> {
    const docRef = doc(this.eventsCollection, eventId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}

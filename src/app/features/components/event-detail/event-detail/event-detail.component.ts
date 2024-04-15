import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';
import { Event } from '../../../../core/models/event/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})

export class EventDetailComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  event: Event | null = null;

  showOverlay: boolean = false;
  eventName: any = "";
  eventId: any = "";

  ngOnInit(): void {
    let eventId = "";
    this.route.params.subscribe(params => {
      eventId = params['id'];
    });

    this.eventsService.getEventsByEventUid(eventId).subscribe((response) => {
      this.event = response;
    });
  }

  navigateToAddListing() {
    this.router.navigateByUrl('/add', { state: { mode: "Add", header: "List New Event" } })
  }

  navigateToUpdateListing(eventId?: string) {
    this.router.navigateByUrl(`/update/${eventId}`, { state: { mode: "Update", header: "Update Event" } })
  }

  navigateToDashboard() {
    this.router.navigateByUrl("/dashboard");
  }

  onDelete(eventName?: string, eventId?: string) {
    this.showOverlay = true;
    this.eventName = eventName;
    this.eventId = eventId;
  }

  confirmDelete() {
    this.eventsService.deleteEvent(this.eventId).subscribe(() => {
      this.showOverlay = false;
      this.eventName = "";
      this.eventId = "";
    });
  }
}

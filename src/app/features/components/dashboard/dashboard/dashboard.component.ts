import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { Router } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';
import { Event } from '../../../../core/models/event/event.model';
import { FeaturesModule } from '../../../features.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, FeaturesModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  router = inject(Router);
  eventsService = inject(EventsService);
  events: Event[] = []; 

  showOverlay: boolean = false;
  eventName: string = "";
  eventId: any = "";

  ngOnInit(): void {
    this.eventsService.getEventsByUid().subscribe((response) => {
      this.events = response;
    });
  }

  navigateToAddListing() {
    this.router.navigateByUrl('/add', { state: { mode: "Add", header: "List New Event" } })
  }

  navigateToUpdateListing(eventId?: string) {
    this.router.navigateByUrl(`/update/${eventId}`, { state: { mode: "Update", header: "Update Event" } })
  }

  navigateToEventDetails(eventId?: string) {
    this.router.navigateByUrl(`/event/${eventId}`);
  }

  onDelete(eventName: string, eventId?: string) {
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

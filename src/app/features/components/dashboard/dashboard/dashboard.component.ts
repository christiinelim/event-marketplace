import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { Router } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';
import { Event } from '../../../../core/models/event/event.model';
import { FeaturesModule } from '../../../features.module';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, FeaturesModule, DeleteConfirmationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  router = inject(Router);
  eventsService = inject(EventsService);
  events: Event[] = []; 
  activeEvents: Event[] = []; 
  pastEvents: Event[] = []; 

  showOverlay: boolean = false;
  eventName: string = "";
  eventId: any = "";
  activeTab: string = "active";

  ngOnInit(): void {
    this.eventsService.getEventsByUid().subscribe((response) => {
      this.pastEvents = response.filter(event => new Date(event.date) < new Date());
      this.activeEvents = response.filter(event => new Date(event.date) >= new Date());
      this.events = this.activeEvents;
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

  navigateToDashboard() {
    this.router.navigateByUrl("/dashboard");
  }

  onDelete(eventName: string, eventId?: string) {
    this.showOverlay = true;
    this.eventName = eventName;
    this.eventId = eventId;
  }

  async deleteClicked() {
    await this.eventsService.deleteEvent(this.eventId).subscribe(() => {
      this.showOverlay = false;
      this.eventName = "";
      this.eventId = "";
    });
    this.navigateToDashboard();
  }

  cancelClicked() {
    this.showOverlay = false;
  }

  setEvents(type: string) {
    if (type === "active") {
      this.events = this.activeEvents;
      this.activeTab = "active";
    } else {
      this.events = this.pastEvents;
      this.activeTab = "past";
    }
  }
}

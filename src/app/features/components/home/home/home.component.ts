import { Component, OnInit, inject } from '@angular/core';
import { NavbarLandingComponent } from '../../../../shared/components/navbar-landing/navbar-landing/navbar-landing.component';
import { EventsService } from '../../../../core/services/events/events.service';
import { Event } from '../../../../core/models/event/event.model';
import { FeaturesModule } from '../../../features.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarLandingComponent, FeaturesModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  eventsService = inject(EventsService);
  router = inject(Router);
  activeEvents: Event[] = [];

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((response) => {
      this.activeEvents = response.filter(event => new Date(event.date) >= new Date());
      console.log(this.activeEvents)
    });
  }

  navigateToEventDetails(eventId?: string) {
    this.router.navigateByUrl(`/event/${eventId}`);
  }
}

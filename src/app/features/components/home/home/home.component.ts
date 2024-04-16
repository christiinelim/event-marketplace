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

  selectedEvents: Event[] = [];
  allEvents: Event[] = [];
  musicEvents: Event[] = [];
  nightlifeEvents: Event[] = [];
  performanceEvents: Event[] = [];
  holidaysEvents: Event[] = [];
  hobbiesEvents: Event[] = [];
  selected: string = "all";
  
  categoryMap: { [key: string]: Event[] } = {
    'music': this.musicEvents,
    'nightlife': this.nightlifeEvents,
    'performance': this.performanceEvents,
    'holidays': this.holidaysEvents,
    'hobbies': this.hobbiesEvents
  };

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((response) => {
      this.selectedEvents = response.filter(event => new Date(event.date) >= new Date());
      this.allEvents = this.selectedEvents;
      console.log(this.selectedEvents);
  
      this.selectedEvents.forEach(event => {
        const category = event.category;
        if (category in this.categoryMap) {
          this.categoryMap[category].push(event);
        }
      });
    });
  }
  
  navigateToEventDetails(eventId?: string) {
    this.router.navigateByUrl(`/view-event/${eventId}`);
  }

  filterEvents(category: string) {
    if (category === "all") {
      this.selectedEvents = this.allEvents;
    } else {
      this.selected = category;
      this.selectedEvents = this.categoryMap[category];
    }
  }
}
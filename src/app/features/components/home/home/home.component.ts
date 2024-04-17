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
  filteredEvents: any[] = [];
  searchedEvents: any[] = [];
  selected: string = "all";
  searchTerm: string = "";
  selectedFilter: string = "ascending";
  showPopup: boolean = false;
  showClearSearch: boolean = false;
  
  categoryMap: { [key: string]: Event[] } = {
    'music': this.musicEvents,
    'nightlife': this.nightlifeEvents,
    'performance': this.performanceEvents,
    'holidays': this.holidaysEvents,
    'hobbies': this.hobbiesEvents
  };

  ngOnInit(): void {
    const state = window.history.state;
    if (state.showPopup) {
      this.showPopup = state.showPopup;
    }
    
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

  hidePopup() {
    this.showPopup = false;
  }

  // autocomplete
  searchEvents() {
    this.filteredEvents = this.allEvents.filter(event =>
        event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectEvent(event: any) {
    this.searchTerm = event.eventName; 
    this.searchedEvents = this.filteredEvents
    this.filteredEvents = [];
  }

  searchEventBySearchTerm() {
    this.selectedEvents = this.searchedEvents;
    this.showClearSearch = true;
  }

  resetSearch() {
    this.showClearSearch = false;
    this.selectedEvents = this.allEvents;
    this.searchTerm = "";
  }

  // filter
  filterEvents(category: string) {
    if (category === "all") {
      this.selected = category;
      this.selectedEvents = this.allEvents;
    } else {
      this.selected = category;
      this.selectedEvents = this.categoryMap[category];
    }
  }

  applyFilter() {
    if (this.selectedFilter === "ascending") {
      this.filterEvents(this.selected);
      this.selectedEvents.sort((a, b) => (a.date > b.date ? 1 : -1)); 
    } else if (this.selectedFilter === "descending") {
      this.filterEvents(this.selected);
      this.selectedEvents.sort((a, b) => (a.date < b.date ? 1 : -1));
    } else if (this.selectedFilter === "free") {
      this.filterEvents(this.selected);
      this.selectedEvents = this.selectedEvents.filter(event => event.cost === 0)
    } else {
      this.filterEvents(this.selected);
      this.selectedEvents = this.selectedEvents.filter(event => event.attendeesAllowed > 0);
    }
  }
}
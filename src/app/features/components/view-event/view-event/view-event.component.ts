import { Component, OnInit, inject } from '@angular/core';
import { NavbarLandingComponent } from '../../../../shared/components/navbar-landing/navbar-landing/navbar-landing.component';
import { EventsService } from '../../../../core/services/events/events.service';
import { Event } from '../../../../core/models/event/event.model';
import { ActivatedRoute } from '@angular/router';
import { SignupFormComponent } from '../../signup-form/signup-form/signup-form.component';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [NavbarLandingComponent, SignupFormComponent],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent implements OnInit {
  eventsService = inject(EventsService);
  route = inject(ActivatedRoute);

  event: Event | null = null;
  mode: string = "Sign up";
  header: string = "Book a slot!"
  displayForm: boolean = false;

  ngOnInit(): void {
    let eventId = "";
    this.route.params.subscribe(params => {
      eventId = params['id'];
    });

    this.eventsService.getEventsByEventUid(eventId).subscribe((response) => {
      this.event = response;
    });
  }

  onSignUp() {
    this.displayForm = true;
  }

  onCancelClicked() {
    this.displayForm = false;
  }
}

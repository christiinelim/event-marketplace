import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { SignupService } from '../../../../core/services/signup/signup.service';
import { Signup } from '../../../../core/models/signup/signup.model';
import { FeaturesModule } from '../../../features.module';
import { SignupFormComponent } from '../../signup-form/signup-form/signup-form.component';
import { EventsService } from '../../../../core/services/events/events.service';
import { Event } from '../../../../core/models/event/event.model';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-signup-list',
  standalone: true,
  imports: [NavbarComponent, FeaturesModule, SignupFormComponent, DeleteConfirmationComponent],
  templateUrl: './signup-list.component.html',
  styleUrl: './signup-list.component.css'
})
export class SignupListComponent implements OnInit {
  route = inject(ActivatedRoute);
  signupService = inject(SignupService);
  eventsService = inject(EventsService);

  signups: Signup[] = []; 
  event: Event | null = null;
  displayForm: boolean = false;
  showOverlay: boolean = false;
  mode: string = "Update";
  header: string = "Update Attendee Detail";
  signupId: string = "";
  nameToDelete: string = "";
  signupIdToDelete: string = "";
  eventId: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });

    this.eventsService.getEventsByEventUid(this.eventId).subscribe((response) => {
      this.event = response;
    });

    this.fetchData();
  }

  fetchData() {
    this.signupService.getSignupsByEventUid(this.eventId).subscribe((response) => {
      this.signups = response;
    });
  }

  updateSignup(signupId: any) {
    this.signupId = signupId;
    this.displayForm = true;
  }

  onCancelClicked() {
    this.displayForm = false;
    this.showOverlay = false;
  }

  deleteClicked() {
    const userId = this.event?.userId || "";
    const eventName = this.event?.eventName || "";
    const category = this.event?.category || "";
    const image = this.event?.image || "";
    const cost = this.event?.cost || 0;
    const date = this.event?.date || "";
    const starttime = this.event?.starttime || "";
    const endtime = this.event?.endtime || "";
    const location = this.event?.location || "";
    const refundPolicy = this.event?.refundPolicy || "";
    const synopsis = this.event?.synopsis || "";
    const description = this.event?.description || "";
    const attendeesAllowed = (this.event?.attendeesAllowed || 0) + 1;

    this.signupService.deleteSignup(this.signupIdToDelete).subscribe(() => {
      const updatedEvent: Event = {
        userId, eventName, category, image, cost, date, starttime, endtime, location, refundPolicy, synopsis, description, attendeesAllowed
      };
      this.eventsService.updateEvent(this.eventId, updatedEvent).subscribe(() => {
        this.showOverlay = false;
        this.fetchData();
      })
    }, (error) => {
      console.error('Sign Up error:', error);
    });
  }


  







  onUpdateSuccess() {
    this.displayForm = false;
    this.fetchData();
  }

  deleteSignup(signupId: any, firstName: string, lastName: string) {
    this.showOverlay = true;
    this.nameToDelete = firstName + " " + lastName;
    this.signupIdToDelete = signupId
  }

}

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
    this.showOverlay = false;
    this.signupService.deleteSignup(this.signupIdToDelete).subscribe(() => {
      this.showOverlay = false;
      this.fetchData();
    })
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

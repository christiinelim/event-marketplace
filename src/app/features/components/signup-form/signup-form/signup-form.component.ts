import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contactValidator } from '../../../../shared/validators/contact.validator';
import { FeaturesModule } from '../../../features.module';
import { Event } from '../../../../core/models/event/event.model';
import { Signup } from '../../../../core/models/signup/signup.model';
import { SignupService } from '../../../../core/services/signup/signup.service';
import { Router } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FeaturesModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})

export class SignupFormComponent implements OnInit {
  @Input() event: Event | null = null;
  @Input() mode: string = "";
  @Input() header: string = "";
  @Input() signupId: string = "";
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateSuccess: EventEmitter<void> = new EventEmitter<void>();

  signupService = inject(SignupService);
  eventsService = inject(EventsService);
  router = inject(Router);
  signup: Signup | null = null;

  signupEventForm!: FormGroup;

  ngOnInit(): void {
    this.signupEventForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      contact: new FormControl("", [Validators.required, contactValidator()]),
      paid: new FormControl("No", [Validators.required])
    });

    if (this.mode === "Update") {
      this.signupService.getSignupByUid(this.signupId).subscribe((response) => {
        this.signup = response;
        this.setInitialFormValues(this.signup);
      })
    }
  }

  // set form values
  setInitialFormValues(data: any): void {
    this.signupEventForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      paid: data.paid
    });
  }

  onSubmit(formData: any) {
    const { firstName, lastName, email, contact } = formData;

    if (this.mode === "Update") {
      const newSignup: Signup = { eventId: this.event?.uid, paid: formData.paid, firstName, lastName, email, contact };
      const eventId = this.event?.uid;
      this.signupService.updateSignup(this.signup?.uid, newSignup).subscribe(() => {
        this.onUpdate();
        this.router.navigateByUrl('/signups/' + eventId)
      }, (error) => {
        console.error('Sign Up error:', error);
      });
    } else {
      const newSignup: Signup = { eventId: this.event?.uid, paid: "No", firstName, lastName, email, contact };

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
      const attendeesAllowed = (this.event?.attendeesAllowed || 0) - 1;

      this.signupService.createSignup(newSignup).subscribe(() => {
        const eventId = this.event?.uid;
        const updatedEvent: Event = {
          userId, eventName, category, image, cost, date, starttime, endtime, location, refundPolicy, synopsis, description, attendeesAllowed
        };
        this.eventsService.updateEvent(eventId, updatedEvent).subscribe(() => {
          this.router.navigateByUrl('/', { state: { showPopup: true } });
        })
      }, (error) => {
        console.error('Sign Up error:', error);
      });
    }
  }
  
  onCancel() {
    this.cancelClicked.emit();
  }

  onUpdate() {
    this.updateSuccess.emit();
  }
}

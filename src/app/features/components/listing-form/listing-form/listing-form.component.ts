import { Component, Inject, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeaturesModule } from '../../../features.module';
import { StorageService } from '../../../../core/services/imageUpload/image-upload.service';
import { Event } from '../../../../core/models/event/event.model';
import { EventsService } from '../../../../core/services/events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [FeaturesModule, NavbarComponent],
  templateUrl: './listing-form.component.html',
  styleUrl: './listing-form.component.css'
})

export class AddListingComponent implements OnInit {
  storageService = inject(StorageService);
  eventsService = inject(EventsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cookieService = inject(CookieService);

  addListingForm!: FormGroup;
  imageUrl: string = "";
  mode: string = "";
  header: string = "";
  event: Event | null = null;
  eventId: string = "";

  ngOnInit(): void {
    const state = window.history.state;
    if (state) {
      this.mode = state.mode;
      this.header = state.header;
      if (this.mode === "Update") {
        this.route.params.subscribe(params => {
          this.eventId = params['id'];
        });

        this.eventsService.getEventsByEventUid(this.eventId).subscribe((response) => {
          this.event = response;
          this.setInitialFormValues(this.event);
        });
      }
    }

    this.addListingForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      refundPolicy: new FormControl('', Validators.required),
      synopsis: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      attendeesAllowed: new FormControl('', Validators.required),
    })
  }

  onSubmit(formData: any) {
    const { eventName, category, cost, date, starttime, endtime, location, refundPolicy, synopsis, description, attendeesAllowed } = formData;
    const userId = this.cookieService.get('userId');
    const newEvent: Event = {
      userId, eventName, category, image: this.imageUrl, cost, date, starttime, endtime, location, refundPolicy, synopsis, description, attendeesAllowed
    }

    if (this.mode === "Add") {
      this.eventsService.createEvent(newEvent).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        console.error('Listing creation error:', error);
      });
    } else {
      this.eventsService.updateEvent(this.eventId, newEvent).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        console.error('Listing update error:', error);
      })
    }
  }

  // set form values
  setInitialFormValues(data: any): void {
    this.addListingForm.patchValue({
      eventName: data.eventName,
      category: data.category,
      cost: data.cost,
      date: data.date,
      starttime: data.starttime,
      endtime: data.endtime,
      location: data.location,
      refundPolicy: data.refundPolicy,
      synopsis: data.synopsis,
      description: data.description,
      attendeesAllowed: data.attendeesAllowed,
    });
  }

  // save image uploaded
  onFileUpload(event: any) {
    const file = event.target.files[0]
    
    if (file){
      this.storageService.uploadFile(file).subscribe((downloadURL) => {
        this.imageUrl = downloadURL;
        console.log(this.imageUrl)
      }, (error) => {
        console.error('Upload error:', error);
      });
    }
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }

}

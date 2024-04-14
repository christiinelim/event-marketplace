import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar/navbar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeaturesModule } from '../../../features.module';
import { StorageService } from '../../../../core/services/storage/storage.service';


@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [FeaturesModule, NavbarComponent],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})

export class AddListingComponent implements OnInit {
  storageService = inject(StorageService);

  addListingForm!: FormGroup;

  ngOnInit(): void {
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

  }

  // save image uploaded
  onFileSelected(event: any) {
    const file = event.target.files[0]
    
    if (file){
      this.storageService.uploadFile(file);
    }
  }

}

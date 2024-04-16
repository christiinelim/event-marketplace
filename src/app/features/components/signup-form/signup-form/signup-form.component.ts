import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contactValidator } from '../../../../shared/validators/contact.validator';
import { FeaturesModule } from '../../../features.module';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FeaturesModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})

export class SignupFormComponent implements OnInit {
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  signupEventForm!: FormGroup;

  ngOnInit(): void {
    this.signupEventForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      confirmPassword: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      contact: new FormControl("", [Validators.required, contactValidator()])
    })
  }

  onSubmit(formDate: any) {

  }

  onCancel() {
    this.cancelClicked.emit();
  }
}

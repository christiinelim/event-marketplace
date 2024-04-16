import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  @Input() subject: string = "";
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();

  onCancel() {
    this.cancelClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }
}

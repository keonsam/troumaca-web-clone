import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-delete-modal',
  templateUrl: 'delete.modal.component.html',
  styleUrls: ['delete.modal.component.css']
})

export class DeleteModalComponent {
 @Input() name: string;
 @Output() delete = new EventEmitter<boolean>();

 onDelete() {
   this.delete.emit(true);
 }
}

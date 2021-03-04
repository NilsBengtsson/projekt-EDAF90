import { Component, Input, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import {BookItemComponent as BookItem} from '../book-item/book-item.component'

@Component({
  selector: 'app-book-delete-confirmation',
  templateUrl: './book-delete-confirmation.component.html',
  styleUrls: ['./book-delete-confirmation.component.css']
})
export class BookDeleteConfirmationComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  constructor() { }

  onConfirmed() {
    this.confirmed.emit(true);
  }

  onRejected() {
    this.confirmed.emit(false);
  }

}

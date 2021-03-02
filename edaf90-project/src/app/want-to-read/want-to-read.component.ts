import { Component, OnInit } from '@angular/core';
import {BookItemComponent as BookItem} from '../book-item/book-item.component'
import { BookDataService } from '../bookDataService';
import { Subscription } from 'rxjs';

interface BookOption {
  name:string,
  value:BookItem,
  checked:boolean
}

@Component({
  selector: 'app-want-to-read',
  templateUrl: './want-to-read.component.html',
  styleUrls: ['./want-to-read.component.css']
})
export class WantToReadComponent implements OnInit {
  bookOptions:BookOption[] = [];

  subscription:Subscription;

  constructor(private data:BookDataService) {
      this.subscription = data.booksToRead.subscribe(books => {
        this.bookOptions = books.map(item => {
          var option:BookOption = {name: item.name, value: item, checked: false}
          return option;
        })
      })
   }

  ngOnInit(): void {
  }

  deleteBook(name:string): void {
    if(confirm("Are you sure you want to delete " + name))
      this.bookOptions = this.bookOptions.filter(op => name != op.value.name);
  }

  setReadBooks() {
    //get checked books
    var readBooks:BookItem[] = this.bookOptions.filter(op => op.checked).map(op => op.value);

    this.data.setReadBooks(readBooks);
  }
}

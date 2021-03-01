import { Component, OnInit } from '@angular/core';
import {BookItemComponent as BookItem} from '../book-item/book-item.component'

@Component({
  selector: 'app-want-to-read',
  templateUrl: './want-to-read.component.html',
  styleUrls: ['./want-to-read.component.css']
})
export class WantToReadComponent implements OnInit {
  books:BookItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.books = [
      {
        name: "Bobsson",
        desc: "Hallå Bob"
      }, 
      {
        name: "Chale",
        desc: "Chale Destroys"
      }
    ];
  }

  deleteBook(name:string): void {
    if(confirm("Are you sure you want to delete " + name))
      this.books = this.books.filter(book => name != book.name);
  }
}

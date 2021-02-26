import { Component, OnInit } from '@angular/core';
import {BookItemComponent as BookItem} from '../book-item/book-item.component'


@Component({
  selector: 'app-read-books',
  templateUrl: './read-books.component.html',
  styleUrls: ['./read-books.component.css']
})
export class ReadBooksComponent implements OnInit {

  constructor() { }
  books:BookItem[] = [];

  ngOnInit(): void {
    this.books = [
      {
        name: "",
        desc: ""
      } 
    ];
  }
  }




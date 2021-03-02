import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {BookItemComponent as BookItem} from '../book-item/book-item.component'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books: BookItem[] = [];

  constructor() { 
    
  }

  searchBooks(searchInput: string){
    this.books = [];
    console.log(searchInput);
    if(searchInput!=""){
      fetch("http://openlibrary.org/search.json?q="+searchInput+"&mode=everything")
      .then(result => result.json())
      .then(response =>{
          for(var i=0; i<100; i++){
              this.books.push({name: response.docs[i].title, author: response.docs[i].author_name[0], desc: ""})
              console.log(response.docs[i].title);
                  "<h2>"+response.docs[i].title+"</h2>"
                  +response.docs[i].author_name[0];
          }
      }).then( () =>
        console.log("fetched!")
      );
    }
  }

  ngOnInit(): void {
  }

}


import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {BookItemComponent as BookItem, BookOption} from '../book-item/book-item.component'
import { BookDataService } from '../bookDataService';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books: BookItem[] = [];
  bookOptions:BookOption[] = [];
  fetchingData = false;

  constructor(private data:BookDataService, private firestore:AngularFirestore) {}

  searchBooks(searchInput: string){
    this.books = [];
    console.log(searchInput);
    if(searchInput!=""){
      this.fetchingData = true;
      fetch("http://openlibrary.org/search.json?q="+searchInput+"&mode=everything")
      .then(result => result.json())
      .then(response =>{
          for(var i=0; i<100; i++){
            if(response.docs[i] !== undefined && response.docs[i].author_name !== undefined) { //discards books with undefined properties
              this.books.push({name: response.docs[i].title, author: response.docs[i].author_name[0], desc: "", id: ""})
              console.log(response.docs[i].title);
                  "<h2>"+response.docs[i].title+"</h2>"
                  +response.docs[i].author_name[0];
            }
          }
      }).then( () => {
        //sets the bookOptions in case of successfull fetch
        this.bookOptions = this.books.map(item => {
          var option:BookOption = {name: item.name, value: item, checked: false, deleting: false}
          return option;
        });
        this.fetchingData = false;
        console.log("fetched!");
      });
    }
  }

  //used by "lägg till markerade" button
  setBooksToRead() {
    var booksToAdd = this.bookOptions.filter(op => op.checked).map(op => op.value);
    var test = 0;
    booksToAdd.forEach(b => {
      const id = this.firestore.createId();
      this.firestore.collection('toRead').doc(id).set(b);
      this.firestore.collection('toRead').doc(id).update({'id':id});
    });
    this.data.setBooksToRead(booksToAdd);
  }

  ngOnInit(): void {

  }

}


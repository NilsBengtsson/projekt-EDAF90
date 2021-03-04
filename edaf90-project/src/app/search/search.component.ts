import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {BookItemComponent as BookItem, BookOption} from '../book-item/book-item.component'
import { BookDataService } from '../bookDataService';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  books: BookItem[] = [];
  bookOptions:BookOption[] = [];
  fetchingData = false;
  selected = 'option2';

  constructor(private data:BookDataService, private firestore:AngularFirestore) {}

  searchBooks(searchInput: string, searchFilter: string){
    this.books = [];
    console.log(searchInput);
    if(searchInput!=""){
      switch(searchFilter){
        case "title":
          this.fetchBooks("https://openlibrary.org/search.json?q=title%3A+"+searchInput+"&mode=everything");
          break;
        case "author":
          fetch("https://openlibrary.org/search/authors.json?q="+searchInput+"&mode=everything")
          .then(result => result.json())
          .then(response =>{
            for(let i=0; i<response.numFound; i++){
              if(response.docs[i] !== undefined) { //discards books with undefined properties
                for(let j=0; j<response.docs[i].top_subjects.length; j++){
                  this.books.push({name: response.docs[i].top_subjects[j], author: response.docs[i].name, desc: "", id: ""})
                  "<h2>"+response.docs[i].top_subjects[j]+"</h2>"
                  +response.docs[i].name;
                }
              }
            }
          }).then( () => {
            //sets the bookOptions in case of successfull fetch
            this.bookOptions = this.books.map(item => {
              let option:BookOption = {name: item.name, value: item, checked: false, deleting: false}
              return option;
            });
            this.fetchingData = false;
            console.log("fetched!");
          });
          //this.fetchBooks("https://openlibrary.org/search/authors.json?q="+searchInput+"&mode=everything");
          break;
        default:
          this.fetchBooks("http://openlibrary.org/search.json?q="+searchInput+"&mode=everything");
      }
    }
  }

  fetchBooks(fetchString: string){
    this.fetchingData = true;
      fetch(fetchString)
      .then(result => result.json())
      .then(response =>{
          let nrOfItems = response.numFound;
          if(nrOfItems > 100){
            nrOfItems = 100;
          }
          for(let i=0; i<nrOfItems; i++){
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
          let option:BookOption = {name: item.name, value: item, checked: false, deleting: false}
          return option;
        });
        this.fetchingData = false;
        console.log("fetched!");
      });
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

  clearChecked(){
    for(let book of this.bookOptions){
      book.checked = false;
    }
  }

  ngOnInit(): void {

  }

}


import { Component, OnInit, OnDestroy } from '@angular/core';
import {BookItemComponent as BookItem, BookOption} from '../book-item/book-item.component'
import { BookDataService } from '../bookDataService';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-want-to-read',
  templateUrl: './want-to-read.component.html',
  styleUrls: ['./want-to-read.component.css']
})


export class WantToReadComponent implements OnInit {
  bookOptions:BookOption[] = [];
  toReadCollection:AngularFirestoreCollection<BookItem>| undefined;
  toReadItems: Observable<BookItem[]>| undefined;

  subscription:Subscription;

  constructor(private data:BookDataService, private firestore:AngularFirestore) {
    this.toReadCollection = this.firestore.collection('toRead');
    this.toReadItems = this.toReadCollection.valueChanges();
    this.subscription = this.toReadItems.subscribe(books => {
      console.log("Sub triggered");
      this.bookOptions = books.map(item => {
        var option:BookOption = {name: item.name, value: item, checked: false}
        return option;
      });
    });
   }

  ngOnInit(): void {
  }

  deleteBook(value:BookItem, ask:boolean=true): void {
    if (ask){
      if(confirm("Are you sure you want to delete " + value.name))
        this.bookOptions = this.bookOptions.filter(op => value.name != op.value.name);
        this.firestore.collection("toRead").doc(value.id).delete();
        //this.toReadCollection?.doc('')
    } else {
      this.bookOptions = this.bookOptions.filter(op => value.name != op.value.name);
      this.firestore.collection("toRead").doc(value.id).delete();
    }
  }



  setReadBooks() {
    //get checked books
    var booksToAdd = this.bookOptions.filter(op => op.checked).map(op => op.value);
    var test = 0
    booksToAdd.forEach(b => {
      const id = this.firestore.createId();
      this.firestore.collection('haveRead').doc(id).set(b);
      this.firestore.collection('haveRead').doc(id).update({'id':id});
    });
    this.data.setReadBooks(booksToAdd);
    booksToAdd.forEach(book => this.deleteBook(book, false));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {BookItemComponent as BookItem, BookOption} from '../book-item/book-item.component'
import { Subscription } from 'rxjs';
import { BookDataService } from '../bookDataService';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read-books',
  templateUrl: './read-books.component.html',
  styleUrls: ['./read-books.component.css']
})
export class ReadBooksComponent implements OnInit {
  bookOptions:BookOption[] = [];
  subscription:Subscription;
  reviews: Map<string, string>;
  currentVal = "";
  toReadCollection:AngularFirestoreCollection<BookItem>| undefined;
  toReadItems: Observable<BookItem[]>| undefined;

  constructor(private data:BookDataService, private firestore:AngularFirestore) {
    this.toReadCollection = this.firestore.collection('haveRead');
    this.toReadItems = this.toReadCollection.valueChanges();
      this.subscription = this.toReadItems.subscribe(books => {
        console.log("Sub triggered");
        this.bookOptions = books.map(item => {
          var option:BookOption = {name: item.name, value: item, checked: false, deleting: false}
          return option;
        });
      });
      this.reviews = new Map();
      } 
      ngOnInit(): void {
      }
       
      review(reviewInput: string, book: string ) {
        this.reviews.set(book, reviewInput);
        console.log('review updated')
      }

      showreviews(book: string) {
        if(this.reviews.size != 0) {
       this.currentVal = this.reviews.get(book) || "";
          console.log('showreviews har körts')
        }
    }
}
        
      

      

      
    






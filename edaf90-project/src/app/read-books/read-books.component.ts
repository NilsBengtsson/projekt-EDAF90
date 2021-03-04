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
  reviews: Array<any> = [];
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
      this.reviews = [];
      } 
      ngOnInit(): void {
      }
       
      review(reviewInput: string) {
        let currentReviews = this.reviews;
        let newReview = [
          reviewInput,
        ]
        currentReviews.push(newReview);
        this.reviews = currentReviews;
        console.log('review updated')
    
        
      }

      showreviews() {
        for (var i = 0; i<this.reviews.length; i++) {
          let review = ('Recension ' + (i+1) + ': ' + this.reviews[i] + ' ');
          this.currentVal += review;
          
          console.log('showreviews har körts')
    }
}
        }
      

      

      
    






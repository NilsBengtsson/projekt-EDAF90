import { Component, OnInit } from '@angular/core';
import {BookItemComponent as BookItem, BookOption} from '../book-item/book-item.component'
import { Subscription } from 'rxjs';
import { BookDataService } from '../bookDataService';

@Component({
  selector: 'app-read-books',
  templateUrl: './read-books.component.html',
  styleUrls: ['./read-books.component.css']
})
export class ReadBooksComponent implements OnInit {
  bookOptions:BookOption[] = [];
  subscription:Subscription;
  reviews: Array<any> = [] 

  

  constructor(private data:BookDataService) {
      this.subscription = data.booksToRead$.subscribe(books => {
        console.log("Sub triggered");
        this.bookOptions = books.map(item => {
          var option:BookOption = {name: item.name, value: item, checked: false}
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
        document.write('Recension ' + (i+1) + ': ' + this.reviews[i] + ' ' + "</br>");
      }

    }

  }


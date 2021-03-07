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
  activeBookList:BookOption[] = []; //lade till denna
  reviewedBookList:BookOption[] = [];
  notReviewedBookList:BookOption[] = [];
  activeButton:Boolean[] = [true, false, false];
  subscription:Subscription;
  reviews: Map<BookOption, string>;
  currentVal = "";
  toReadCollection:AngularFirestoreCollection<BookItem>| undefined;
  toReadItems: Observable<BookItem[]>| undefined;
  selected = "";

  constructor(private data:BookDataService, private firestore:AngularFirestore) {
    this.toReadCollection = this.firestore.collection('haveRead');
    this.toReadItems = this.toReadCollection.valueChanges();
    this.subscription = this.toReadItems.subscribe(books => {
      console.log("Sub triggered");
      this.bookOptions = books.map(item => {
        var option:BookOption = {name: item.name, value: item, checked: false, deleting: false, revieweing: false}
        return option;
      });
      this.activeBookList = this.bookOptions; //lade till denna
    });
    this.reviews = new Map();
  } 

  ngOnInit(): void {
    
  }

  review(reviewInput: string, value:BookOption) {
      this.reviews.set(value, reviewInput);
      console.log('review updated')
      this.reviewedBookList.push(value)

    if(this.reviews.has(value)) {
      this.currentVal = 'Din recension av boken "' + value.name + '" är: ' + (this.reviews.get(value));
    } else {
      this.currentVal = 'Boken har inte recenserats'
    }
  }

  showreviews(value: BookOption) {
    if(this.reviews.size != 0) {
      this.currentVal = value.name + ': ' + (this.reviews.get(value) || "") 
      console.log('showreviews har körts')
    }
  }

  //Vad som händer när man klickar knappen "Alla lästa böcker"
  showAllBooks(){
    this.activeBookList = this.bookOptions;
    this.activeButton[0] = true;
    this.activeButton[1] = false;
    this.activeButton[2] = false;
    //Listan skrivs ut i div: "result-box-wrapper"
  }

  //Vad som händer när man klickar knappen "Recenserade böcker"
  showReviewedBooks(){
    //ändra activeBookList till att visa lista av recenserade böcker
    //Listan skrivs ut i div: "result-box-wrapper"
    this.activeBookList = this.reviewedBookList;
    this.activeButton[0] = false;
    this.activeButton[1] = true;
    this.activeButton[2] = false;
  }

  //Vad som händer när man klickar knappen "Orecenserade böcker"
  showNoReviewedBooks(){
    //ändra activeBookList till att visa lista av orecenserade böcker
    //Listan skrivs ut i div: "result-box-wrapper"
    this.activeBookList = this.notReviewedBookList;
    this.activeButton[0] = false;
    this.activeButton[1] = false;
    this.activeButton[2] = true;
  }

  activateRevieweing(value: BookOption){
    value.revieweing = !value.revieweing;
  }

  deleteBook(value:BookItem, ask:boolean=true): void {
    if (ask){
      this.bookOptions.filter(op => op.value == value).forEach(op => op.deleting = true);
    } else {
      this.data.setBooksToRead(this.bookOptions.filter(op => value.name != op.value.name).map(op => op.value));
      this.firestore.collection("haveRead").doc(value.id).delete();
    }
  }

  
  deleteOnConfirm(confirmed:boolean, value:BookItem): void {
    if(confirmed) {
      this.data.setBooksToRead(this.bookOptions.filter(op => value.name != op.value.name).map(op => op.value));
      this.firestore.collection("haveRead").doc(value.id).delete();
    } else {
      this.bookOptions.filter(op => op.value == value).forEach(op => op.deleting = false);
    }
  }


  
  /*
  review(reviewInput: string, book: string ) {
    this.reviews.set(book, reviewInput);
    console.log('review updated')
  }

  showreviews(book: string) {
    if(this.reviews.size != 0) {
      this.currentVal = book + ': ' + (this.reviews.get(book) || "") 
      console.log('showreviews har körts')
    }
  }

  deleteBook(value:BookItem, ask:boolean=true): void {
    if (ask){
      this.bookOptions.filter(op => op.value == value).forEach(op => op.deleting = true);
    } else {
      this.data.setBooksToRead(this.bookOptions.filter(op => value.name != op.value.name).map(op => op.value));
      this.firestore.collection("haveRead").doc(value.id).delete();
    }
  }

  deleteOnConfirm(confirmed:boolean, value:BookItem): void {
    if(confirmed) {
      this.data.setBooksToRead(this.bookOptions.filter(op => value.name != op.value.name).map(op => op.value));
      this.firestore.collection("haveRead").doc(value.id).delete();
    } else {
      this.bookOptions.filter(op => op.value == value).forEach(op => op.deleting = false);
    }
  }*/
}
        
      

      

      
    






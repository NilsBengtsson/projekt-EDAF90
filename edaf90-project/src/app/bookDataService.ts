import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookItemComponent as BookItem } from './book-item/book-item.component'

export const TEST_BOOKS:BookItem[] = [
    {name: "A", desc: "A Book", author: "Alle", id: "0", review: "Bra"},
    {name: "B", desc: "B Book", author: "Blle", id: "1", review: "Dålig"}
  ];

@Injectable()
export class BookDataService {

    private booksToReadSource = new BehaviorSubject<BookItem[]>([]);
    private readBooksSource = new BehaviorSubject<BookItem[]>([]); 

    booksToRead$ = this.booksToReadSource.asObservable();
    readBooks$ = this.readBooksSource.asObservable();

    setBooksToRead(books: BookItem[]) {
        console.log("setting books to read in observable to: " + books.map(book => book.name))
        this.booksToReadSource.next(books);
    }

    setReadBooks(books: BookItem[]) {
        console.log("setting read books in observable to: " + books.map(book => book.name))
        this.readBooksSource.next(books);
    }

}
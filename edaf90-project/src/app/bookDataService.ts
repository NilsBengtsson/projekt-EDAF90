import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookItemComponent as BookItem } from './book-item/book-item.component'

export const TEST_BOOKS:BookItem[] = [
    {name: "A", desc: "A Book", author: "Alle"},
    {name: "B", desc: "B Book", author: "Blle"}
  ];

@Injectable()
export class BookDataService {

    private booksToReadSource = new Subject<BookItem[]>();
    private readBooksSource = new Subject<BookItem[]>(); 

    booksToRead = this.booksToReadSource.asObservable();
    readBooks = this.readBooksSource.asObservable();

    setBooksToRead(books: BookItem[]) {
        this.booksToReadSource.next(books);
    }

    setReadBooks(books: BookItem[]) {
        console.log("setting read books in observable to: " + books.map(book => book.name))
        this.readBooksSource.next(books);
    }

}
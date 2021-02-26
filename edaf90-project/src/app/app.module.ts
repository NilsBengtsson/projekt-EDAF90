import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadBooksComponent } from './read-books/read-books.component';
import { WantToReadComponent } from './want-to-read/want-to-read.component';
import { SearchComponent } from './search/search.component';
import { BookItemComponent } from './book-item/book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadBooksComponent,
    WantToReadComponent,
    SearchComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

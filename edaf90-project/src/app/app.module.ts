import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { ReadBooksComponent } from './read-books/read-books.component';
import { WantToReadComponent } from './want-to-read/want-to-read.component';
import { SearchComponent } from './search/search.component';
import { BookItemComponent } from './book-item/book-item.component';
=======
import { TestComponent } from './test/test.component';

>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< Updated upstream
    ReadBooksComponent,
    WantToReadComponent,
    SearchComponent,
    BookItemComponent
=======
    routingComponents,
    TestComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

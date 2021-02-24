import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from './search/search.component';
import { WantToReadComponent } from './want-to-read/want-to-read.component';
import { ReadBooksComponent } from './read-books/read-books.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    {path: 'search', component: SearchComponent},
    {path: 'wantToRead', component: WantToReadComponent},
    {path: 'readBooks', component: ReadBooksComponent}
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

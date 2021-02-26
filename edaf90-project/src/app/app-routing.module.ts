import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from './search/search.component';
import { WantToReadComponent } from './want-to-read/want-to-read.component';
import { ReadBooksComponent } from './read-books/read-books.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'search',component: SearchComponent},
  {path: 'want-to-read', component: WantToReadComponent},
  {path: 'read-books', component: ReadBooksComponent}
];   
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [SearchComponent, WantToReadComponent, ReadBooksComponent]

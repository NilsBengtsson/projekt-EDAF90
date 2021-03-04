import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookDataService } from './bookDataService'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {MatProgressBarModule} from '@angular/material/progress-bar';
<<<<<<< Updated upstream
import { BookDeleteConfirmationComponent } from './book-delete-confirmation/book-delete-confirmation.component';
=======
import { SettingsComponent } from './settings/settings.component';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,   
<<<<<<< Updated upstream
    routingComponents, 
    BookDeleteConfirmationComponent, 
=======
    routingComponents, SettingsComponent, 
>>>>>>> Stashed changes

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatProgressBarModule
  ],
  providers: [BookDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

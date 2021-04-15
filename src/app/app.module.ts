import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { movieReducer } from './movies.reducer';
import { SpokenLanguagesPipe } from './pipes/spoken-languages.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { MyListsComponent } from './components/my-lists/my-lists.component';
import { RateValidatorDirective } from './directives/rate-validator.directive';
import { InputValidatorDirective } from './directives/input-validator.directive';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviePopupComponent } from './components/movie-popup/movie-popup.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { MovieEntryDialogComponent } from './components/movie-entry-dialog/movie-entry-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    MovieListComponent,
    MyListsComponent,
    SearchMoviesComponent,
    MoviePopupComponent,
    InputValidatorDirective,
    SpokenLanguagesPipe,
    RateValidatorDirective,
    MovieEntryDialogComponent,
  ],
  imports: [
    MatSnackBarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ movieList: movieReducer }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  entryComponents: [MoviePopupComponent],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

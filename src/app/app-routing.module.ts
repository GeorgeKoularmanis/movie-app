import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieEntryDialogComponent } from './components/movie-entry-dialog/movie-entry-dialog.component';
import { MyListsComponent } from './components/my-lists/my-lists.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';

const routes: Routes = [
  { path: 'home', component: SearchMoviesComponent },
  { path: 'my-lists', component: MyListsComponent },
  { path: 'movie/:id', component: MovieEntryDialogComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: SearchMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

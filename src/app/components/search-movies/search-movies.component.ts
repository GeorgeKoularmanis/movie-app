import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/classes/Movie';
import { setMovies } from 'src/app/movies.actions';
import { LoaderService } from 'src/app/services/loader.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {

  myLists: any[];
  totalMovies = 0;
  totalPages = 0;

  isLoading: boolean;
  resultsTitle: string;
  searchForm: FormGroup;
  showResultsSection: boolean;

  constructor(
    private loaderService: LoaderService,
    private moviesService: MoviesService,
    private store: Store<any>) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.searchForm = new FormGroup({
      token: new FormControl({value: null, disabled: false})
    });
  }

  onSearchMovies = (event?: any) => {
    const token = this.searchForm.get('token').value;
    this.loaderService.startLoader();
    if(!event) this.clearPreviousResults();

    this.moviesService.getMovies(token, event || 1).subscribe((resp: any) => {
      this.loaderService.startLoader();

      setTimeout(() => {
        this.loaderService.stopLoader();
        this.handleResponse(resp, token);
      }, 1000);
    });
  }

  private handleResponse = (resp, token) => {
    let movies: Movie[] = [];

    if(resp && resp.results && resp.results.length){
      resp.results.forEach(element => {
        const movie = new Movie(false, element);
        movies.push(movie);
      });

      this.showResultsSection = true;
      this.myLists = [...movies];
      this.totalMovies = resp.total_results;
      this.totalPages = resp.total_pages;
      this.resultsTitle = 'Results for: ' + token;

      this.store.dispatch(setMovies({movies: movies}));
    }
    else{
      this.resultsTitle = 'No Results';
    }
  }

  private clearPreviousResults = () => {
    this.resultsTitle = '';
    this.myLists = [];
    this.totalMovies = 0;
    this.totalPages = 1;
  }

}

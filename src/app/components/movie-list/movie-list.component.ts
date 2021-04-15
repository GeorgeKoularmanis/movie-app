import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/classes/Movie';
import { IMovieState } from 'src/app/interfaces/IMovieState';
import { LoaderService } from 'src/app/services/loader.service';
import { MoviesService } from 'src/app/services/movies.service';
import { MoviePopupComponent } from '../movie-popup/movie-popup.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnChanges {

  @Input() totalPages: number;
  @Input() totalMovies: number;
  @Input() title: string = null;
  @Input() myListMovies: Movie[];
  @Input() isSearchView: boolean;

  @Output() actionCompleted = new EventEmitter<any>();
  @Output() getNextMovies = new EventEmitter<number>();

  pageSize: 20;
  pageLength: number;
  pageSizeOptions = [20];

  movies: Movie[];
  hasResults: boolean;
  currentMyListMovies: Movie[];

  constructor(
    public dialog: MatDialog,
    private loaderService: LoaderService,
    private moviesService: MoviesService,
    private store: Store<any>) { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChanges): void {
    if(change && change.myListMovies && change.myListMovies.currentValue){
      if(change.myListMovies.currentValue.length){
        this.initList(change.myListMovies.currentValue, this.totalMovies);
      }
      else{
        this.totalMovies = 0;
        this.totalPages = 1;
        this.initList([], 0);
      }
    }
  }
  private initList = (movies: Movie[], totalLength) => {
    this.pageLength = totalLength;
    this.movies = [...movies].slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
    this.hasResults = this.movies && (this.movies.length > 0);
  }

  pageChangeEvent(event) {
    if(this.isSearchView){
      this.getSearchNextMovies(event);
    }
  }

  private getSearchNextMovies = (event) => {
    /*Search view implementation: multiple getMovies api calls*/
    const newPage = event.pageIndex + 1;
    if(newPage <= this.totalPages){
      this.getNextMovies.emit(newPage);
    }
  }

  openDetailsPopup = (id: number) => {
    if(this.isSearchView){
      /*get movie details first*/
      this.getMovieDetails(id);
    }
    else{
      /*has already full movie details*/
      let selectedMovie = this.movies.find(movie => movie.id === id);
      this.openDialog(selectedMovie);
    }
  }

  getMovieDetails(id: number){
    this.loaderService.startLoader();
    this.moviesService.getMovieDetails(id.toString()).subscribe(
      (resp) => {
        this.loaderService.stopLoader();
        this.handleDetailsResp(resp);
      },
      err => {
        this.loaderService.stopLoader();
        console.error(err);
      }
    );
  }

  private handleDetailsResp = (resp: any) => {
    let movie = new Movie(true, resp);
    this.openDialog(movie);
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MoviePopupComponent, {
      width: '500px',
      height: '600px',
      data: {movie: movie, isCollectionsView: !this.isSearchView}
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(Boolean)
    )
    .subscribe(({ isActionCompleted }) => {
      if(isActionCompleted && !this.isSearchView){
       this.actionCompleted.emit();
      }
    });
  }

}


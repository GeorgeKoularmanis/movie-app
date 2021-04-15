import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/classes/Movie';
import { LoaderService } from 'src/app/services/loader.service';
import { MoviesService } from 'src/app/services/movies.service';
import { MoviePopupComponent } from '../movie-popup/movie-popup.component';

@Component({
  selector: 'app-movie-entry-dialog',
  templateUrl: './movie-entry-dialog.component.html',
  styleUrls: ['./movie-entry-dialog.component.scss']
})
export class MovieEntryDialogComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      console.log(id)
      if (!id) { return; }
      this.getMovieDetails(id);
    })
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MoviePopupComponent, {
      width: '500px',
      height: '600px',
      data: {movie, isCollectionsView: false}
    });
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

}

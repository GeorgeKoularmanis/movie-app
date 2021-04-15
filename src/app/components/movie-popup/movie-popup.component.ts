import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collection } from 'src/app/classes/Collection';
import { IMoviePopupData } from 'src/app/interfaces/IMoviePopupData';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-popup',
  templateUrl: './movie-popup.component.html',
  styleUrls: ['./movie-popup.component.scss']
})
export class MoviePopupComponent implements OnInit, OnDestroy {

  rateForm: FormGroup;
  actionCompleted: boolean;
  userLists: Collection[] = [];
  userListsIncludingMovie: Collection[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private moviesService: MoviesService,
    public dialogRef: MatDialogRef<MoviePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMoviePopupData) {
      this.initForm();
      this.getUserLists();
    }

  ngOnInit = () => {
  }

  private initForm = () => {
    this.rateForm = new FormGroup({
      rate: new FormControl({value: null, disabled: false})
    })
  }

  private getUserLists = () => {
    let movieAppData = localStorage["movieAppData"];
    let movieAppDataParsed = movieAppData ? JSON.parse(movieAppData) : null;

    /*current user lists*/
    this.userLists =
    movieAppDataParsed && movieAppDataParsed.lists && movieAppDataParsed.lists.length ?
     [...movieAppDataParsed.lists] :
      [];

    /*current user lists including the movie*/
    this.userListsIncludingMovie =
      this.userLists && this.userLists.length ?
        this.userLists.filter(userList => {
        let flag = false;
        if(userList.movies && userList.movies.length){
          userList.movies.forEach(movie => {
            if(movie.id === this.data.movie.id){
              flag = true;
            }
          });
        }
        return flag;
        }) :
          [];
  }

  rateMovie = () => {
    this.moviesService.guestSession(this.data.movie.id.toString()).subscribe((resp)=> {
      if(resp && resp.success){
        this.executeRateMovie(resp.guest_session_id);
      }
    });
  }

  private executeRateMovie = (sessionId) => {
    const rate = Number(this.rateForm.get('rate').value);
    this.moviesService.rateMovie(this.data.movie.id.toString(), rate, sessionId).subscribe((resp)=> {
      if(resp && resp.success){
        this.openSnackBar('Action completed successfully');
      }
    });
  }

  addToList = (selectedId: string, listName: string) => {
    this.userLists.map(list => {
      if(list.id === selectedId){
        list.movies.push(this.data.movie);
      }
    });

    this.openSnackBar('Movie added to ' + listName + ' list successfully');
    localStorage.setItem('movieAppData', JSON.stringify({lists: this.userLists}));

    this.actionCompleted = true;
    this.getUserLists();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  removeFromList = (selectedId: string, listName: string) => {
    this.userLists.map(list => {
      if(list.id === selectedId){
        list.movies = list.movies.filter(movie => movie.id !== this.data.movie.id);
      }
    });

    this.openSnackBar('Movie removed from ' + listName + ' list successfully');
    localStorage.setItem('movieAppData', JSON.stringify({lists: this.userLists}));

    this.actionCompleted = true;
    this.getUserLists();
  }

  ngOnDestroy(): void {
    this.dialogRef.close({ isActionCompleted: this.actionCompleted });
  }

}



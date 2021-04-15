import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collection } from 'src/app/classes/Collection';
import * as uuid from 'uuid';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {

  totalPages: number;
  totalMovies: number;
  createForm: FormGroup;
  myLists: Collection[];

  constructor(private _snackBar: MatSnackBar,) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getMyLists();
  }

   getMyLists = () => {
     /*Getting user lists from localStorage*/
    let movieAppData = localStorage["movieAppData"];
    let movieAppDataParsed = movieAppData ? JSON.parse(movieAppData) : null;

    this.myLists =
    movieAppDataParsed && movieAppDataParsed.lists && movieAppDataParsed.lists.length ?
     [...movieAppDataParsed.lists] :
      [];

    this.totalMovies = this.myLists && this.myLists.length ? this.myLists.length : 0;
    this.totalPages = this.getTotalPages();
  }

  private getTotalPages = (): number => {
    let totalPages: number;
    let num = this.totalMovies / 20;

    if(!num) {
      totalPages = 1;
    }
    else{
      totalPages = num - Math.floor(num) > 0 ? num + 1 : num;
    }

    return totalPages;
  }

  private initForm = () => {
    this.createForm = new FormGroup({
      title: new FormControl({value: null, disabled: false}),
      description: new FormControl({value: null, disabled: false}),
    });
  }

  createList = () => {
    let movieAppData = localStorage["movieAppData"]
    let movieAppDataParsed = movieAppData ? JSON.parse(movieAppData) : null;
    let currentLists =
    movieAppDataParsed && movieAppDataParsed.lists && movieAppDataParsed.lists.length ?
     [...movieAppDataParsed.lists] :
      [];

    currentLists.push(this.buildNewList());
    localStorage.setItem('movieAppData', JSON.stringify({lists: currentLists}));

    this.openSnackBar('New list created successfully');
    this.refresh();
  }

  private refresh = () => {
    this.createForm.get('title').setValue(null);
    this.createForm.get('description').setValue(null);

    this.getMyLists();
  }

  private buildNewList = (): Collection => {
    const newCollection: Collection = {
      id: uuid.v4(),
      name: this.createForm.get('title').value,
      movies: [],
      description: this.createForm.get('description').value
    }

    return newCollection;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

}

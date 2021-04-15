import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { setMovies } from './movies.actions';

export const initialState = {
  movies: []
};

const _movieReducer = createReducer(
  initialState,
  on(setMovies, (state, {movies}) => ({...state, movies: movies})),
);

export function movieReducer(state, action) {
  return _movieReducer(state, action);
}

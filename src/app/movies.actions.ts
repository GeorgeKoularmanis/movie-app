import { createAction, props } from '@ngrx/store';
import { Movie } from './classes/Movie';

export const setMovies = createAction(
    '[Movies Component] SetMovies',
    props<{ movies: Movie[] }>()
  );

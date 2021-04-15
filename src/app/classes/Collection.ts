import { Movie } from "./Movie";
import * as uuid from 'uuid';

export class Collection{
  id: string;
  name: string;
  movies: Movie[];
  description: string;

  constructor(){
    this.id = uuid.v4();
    this.name = null,
    this.movies = [];
    this.description = null
  }
}

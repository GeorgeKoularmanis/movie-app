import { _imgPath } from "../extensions/constants";

export class Movie {
  id: number;
  title: string;
  poster: string;

  text: string;
  budget: number;
  releaseDate: string;
  revenue: number;
  voteAvg: number;
  voteCount: number;
  spokenLanguages: any[];

  constructor(hasDetails: boolean, item: any){
    if(!hasDetails){
      this.id = item.id;
      this.poster = _imgPath + item.poster_path;
      this.title = item.original_title;
      this.text = null;
      this.budget = null;
      this.releaseDate = null;
      this.revenue = null;
      this.voteAvg = item.vote_average;
      this.voteCount = null;
      this.spokenLanguages = null;
    }
    else{
      this.id = item.id;
      this.poster = _imgPath + item.poster_path;
      this.title = item.original_title;
      this.text = item.overview;
      this.budget = item.budget;
      this.releaseDate = item.release_date;
      this.revenue = item.revenue;
      this.voteAvg = item.vote_average;
      this.voteCount = item.vote_count;
      this.spokenLanguages = item.spoken_lan
    }
  }

}

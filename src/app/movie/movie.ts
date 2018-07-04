export class Movie {

  id: number;
  name: string;
  genre: string;
  director: string;

  constructor(id: number, name: string, genre: string, director: string){
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.director = director;
  }

}

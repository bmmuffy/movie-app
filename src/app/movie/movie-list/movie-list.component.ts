import { Component, OnInit } from '@angular/core';
import { Movie } from "../movie";
import { MovieService } from "../movie.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit {

  private movies: Movie[];

  constructor(private router: Router,
              private movieService: MovieService) { }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.findAll().subscribe(
      movies => {
        this.movies = movies;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewMoviePage() {
    this.router.navigate(['/movie/create']);
  }

  editMoviePage(movie: Movie) {
    if (movie) {
      this.router.navigate(['/movie/edit', movie.id]);
    }
  }

  deleteMovie(movie: Movie) {
    if (movie) {
      this.movieService.deleteMovieById(movie.id).subscribe(
        res => {
          this.getAllMovies();
          this.router.navigate(['/movie']);
          console.log('done');
        }
      );
    }
  }

}

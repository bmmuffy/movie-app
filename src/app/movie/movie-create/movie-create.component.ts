import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MovieService} from "../movie.service";
import {Movie} from "../movie";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [MovieService]
})
export class MovieCreateComponent implements OnInit, OnDestroy {


  id: number;
  movie: Movie;

  movieForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.movieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required)
    });



    if (this.id) { //edit form
      this.movieService.findById(this.id).subscribe(
        movie => {
          this.id = movie.id;
          this.movieForm.patchValue({
            name: movie.name,
            genre: movie.genre,
            director: movie.director,
          });
        },error => {
          console.log(error);
        }
      );

    }


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.movieForm.valid) {
      if (this.id) {
        let movie: Movie = new Movie(this.id,
          this.movieForm.controls['name'].value,
          this.movieForm.controls['genre'].value,
          this.movieForm.controls['director'].value);
        this.movieService.updateMovie(movie).subscribe();
      } else {
        let movie: Movie = new Movie(null,
          this.movieForm.controls['name'].value,
          this.movieForm.controls['genre'].value,
          this.movieForm.controls['director'].value);
        this.movieService.saveMovie(movie).subscribe();

      }

      this.movieForm.reset();
      this.router.navigate(['/movie']);

    }
  }

  redirectMoviePage() {
    this.router.navigate(['/movie']);

  }

}

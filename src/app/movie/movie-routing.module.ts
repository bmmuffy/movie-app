import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';

import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../_guards';

const routes: Routes = [
  {path: 'movie', component: MovieListComponent},
  {path: 'movie/create', component: MovieCreateComponent},
{path: 'movie/edit/:id', component: MovieCreateComponent},
{ path: '', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
      // otherwise redirect to home
{ path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }

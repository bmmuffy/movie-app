import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { MovieCreateComponent } from './movie/movie-create/movie-create.component';


const routes: Routes = [
{ path: '', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {path: 'movie', component: MovieListComponent},
  {path: 'movie/create', component: MovieCreateComponent},
{path: 'movie/edit/:id', component: MovieCreateComponent},
      // otherwise redirect to home
{ path: '**', redirectTo: '' }

];
//custom 
//export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

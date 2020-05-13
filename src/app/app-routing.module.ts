import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowComponent } from './pages/show/show.component';
import { SpotifyAuthModule } from 'spotify-auth';
import { InfoService } from './pages/info-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpotifyAuthInterceptor2 } from './pages/spotify-auth-inter';


const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'complete',
        component: ShowComponent
    },
    SpotifyAuthModule.authRoutes()[0]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 			InfoService,
    {
        provide:  HTTP_INTERCEPTORS,
        //Force interception to use your new shiny headers!
        useClass:  SpotifyAuthInterceptor2,
        multi:  true
    }]
})
export class AppRoutingModule { }

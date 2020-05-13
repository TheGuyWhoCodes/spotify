import { Component, OnInit } from '@angular/core';
import { TokenService, AuthService } from 'spotify-auth';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { InfoService } from './pages/info-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor( 	private  infoSvc:  InfoService,
        private  tokenSvc:  TokenService,
        private  authService:  AuthService,
        private  router:  Router) {}
    ngOnInit(): void {
        this.authService.authorizedStream.pipe(filter(x  =>  x)).subscribe(() => {
            this.router.navigate(['complete']);	
        });
    }
  title = 'quarantine-spotify';
}

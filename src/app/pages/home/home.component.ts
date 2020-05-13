import { Component, OnInit } from '@angular/core';
import { ScopesBuilder, AuthConfig, AuthService, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private  authService:  AuthService,
    private  tokenSvc:  TokenService,
    private  router:  Router) { }

  ngOnInit() {
  }
  public  login():  void {
    const scopes = new ScopesBuilder().withScopes(ScopesBuilder.HISTORY).build();
        const ac:  AuthConfig  = {
            client_id:  "8488d51a53dd43fe85935f65579801cb", 
            response_type:  "token",
            redirect_uri:  "http://ariagno.com/spotify/authorized", 
            state:  "",
            show_dialog:  true,
            scope:  scopes
        };
        this.authService.configure(ac).authorize(); // Magic happens here
    }
}

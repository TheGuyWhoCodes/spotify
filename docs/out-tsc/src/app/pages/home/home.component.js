import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ScopesBuilder } from 'spotify-auth';
let HomeComponent = class HomeComponent {
    constructor(authService, tokenSvc, router) {
        this.authService = authService;
        this.tokenSvc = tokenSvc;
        this.router = router;
    }
    ngOnInit() {
    }
    login() {
        const scopes = new ScopesBuilder().withScopes(ScopesBuilder.HISTORY).build();
        const ac = {
            client_id: "8488d51a53dd43fe85935f65579801cb",
            response_type: "token",
            redirect_uri: "http://localhost:4202/authorized",
            state: "",
            show_dialog: true,
            scope: scopes
        };
        this.authService.configure(ac).authorize(); // Magic happens here
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map
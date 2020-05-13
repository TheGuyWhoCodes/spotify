import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
let AppComponent = class AppComponent {
    constructor(infoSvc, tokenSvc, authService, router) {
        this.infoSvc = infoSvc;
        this.tokenSvc = tokenSvc;
        this.authService = authService;
        this.router = router;
        this.title = 'quarantine-spotify';
    }
    ngOnInit() {
        this.authService.authorizedStream.pipe(filter(x => x)).subscribe(() => {
            this.router.navigate(['complete']);
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
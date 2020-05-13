import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do'; //Required, yes!
import { SpotifyAuthInterceptor } from 'spotify-auth';
let SpotifyAuthInterceptor2 = class SpotifyAuthInterceptor2 extends SpotifyAuthInterceptor {
    constructor(tokenSvc) {
        super(tokenSvc);
    }
    doOnError(err) { }
};
SpotifyAuthInterceptor2 = tslib_1.__decorate([
    Injectable()
], SpotifyAuthInterceptor2);
export { SpotifyAuthInterceptor2 };
//# sourceMappingURL=spotify-auth-inter.js.map
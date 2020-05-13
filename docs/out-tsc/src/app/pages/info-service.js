import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
let InfoService = class InfoService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.apiUserUrl = 'https://api.spotify.com/v1/me';
        this.apiAlbumsUrl = 'https://api.spotify.com/v1/me/albums';
        this.apiQuarantine = 'https://api.spotify.com/v1/me/top/tracks';
        this.apiQuarantineArtists = 'https://api.spotify.com/v1/me/top/artists';
        this.user = {};
        this.user$ = new BehaviorSubject(this.user);
    }
    fetchUserInfo() {
        return this.http.get(this.apiUserUrl).pipe(tap((user) => {
            this.user$.next(this.user);
        }), catchError(this.handleError('getSelf')));
    }
    fetchUserAlbums() {
        return this.http.get(this.apiAlbumsUrl).pipe(tap((user) => {
            this.user$.next(this.user);
        }), catchError(this.handleError('getSelfAlbums')));
    }
    fetchTopQuarantineTracks() {
        return this.http.get(this.apiQuarantine, {
            params: {
                limit: '4',
                time_range: "short_term"
            }
        }).pipe(tap((user) => {
            this.user$.next(this.user);
        }), catchError(this.handleError('getSelfAlbums')));
    }
    fetchTopQuarantineArtists() {
        return this.http.get(this.apiQuarantineArtists, {
            params: {
                limit: '4',
                time_range: "short_term"
            }
        }).pipe(tap((user) => {
            this.user$.next(this.user);
        }), catchError(this.handleError('getSelfAlbums')));
    }
    getUserStream() {
        return this.user$.asObservable();
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            result = error;
            return of(result);
        };
    }
};
InfoService = tslib_1.__decorate([
    Injectable()
], InfoService);
export { InfoService };
//# sourceMappingURL=info-service.js.map
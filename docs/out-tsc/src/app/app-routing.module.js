import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowComponent } from './pages/show/show.component';
import { SpotifyAuthModule } from 'spotify-auth';
import { InfoService } from './pages/info-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpotifyAuthInterceptor2 } from './pages/spotify-auth-inter';
const routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'complete',
        component: ShowComponent
    },
    SpotifyAuthModule.authRoutes()[0]
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
        providers: [InfoService,
            {
                provide: HTTP_INTERCEPTORS,
                //Force interception to use your new shiny headers!
                useClass: SpotifyAuthInterceptor2,
                multi: true
            }]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
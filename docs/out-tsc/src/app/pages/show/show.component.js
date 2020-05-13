import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ScopesBuilder } from 'spotify-auth';
import { switchMap } from 'rxjs/operators';
let ShowComponent = class ShowComponent {
    constructor(authService, infoSvc, tokenSvc, router) {
        this.authService = authService;
        this.infoSvc = infoSvc;
        this.tokenSvc = tokenSvc;
        this.router = router;
        this.stream = null;
        this.stream1 = null;
        this.artists = {};
        this.tracks = {};
        this.isLoggedIn = true;
        this.trackLoading = true;
        this.artistsLoading = true;
        this.error = false;
    }
    ngOnDestroy() {
        if (this.stream) {
            this.stream.unsubscribe();
        }
    }
    /**
     * ngOngInit is the subscriber to the recentReleases endpoint, doesn't need unsubscribe
     */
    ngOnInit() {
        if (this.tokenSvc.oAuthToken == "") {
            this.isLoggedIn = false;
        }
        this.selectedVal = "track";
        const stream = this.tokenSvc.authTokens.pipe(switchMap((x) => {
            this.trackLoading = false;
            return this.infoSvc.fetchTopQuarantineTracks();
        }));
        this.stream = stream.subscribe((x) => {
            this.tracks = x;
            this.mergeImages();
        });
        const stream1 = this.tokenSvc.authTokens.pipe(switchMap((x) => {
            this.artistsLoading = false;
            return this.infoSvc.fetchTopQuarantineArtists();
        }));
        this.stream1 = stream1.subscribe((x) => {
            this.artists = x;
            this.mergeArtistImages();
        });
    }
    shouldLoad() {
        if (this.isLoggedIn == false) {
            return false;
        }
        else {
            if (this.trackLoading && this.artistsLoading) {
                return true;
            }
        }
    }
    redirect() {
        this.router.navigate(["recent-releases"]);
    }
    onValChange(val) {
        this.selectedVal = val;
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
    mergeImages() {
        var canvas = this.canvas.nativeElement;
        var context = canvas.getContext('2d');
        let background = new Image();
        let img2 = new Image();
        let img3 = new Image();
        let img4 = new Image();
        let albumSize = 175;
        background.setAttribute('crossorigin', 'anonymous'); // works for me
        img2.setAttribute('crossorigin', 'anonymous'); // works for me
        img3.setAttribute('crossorigin', 'anonymous'); // works for me
        img4.setAttribute('crossorigin', 'anonymous'); // works for me
        background.onload = () => {
            canvas.width = 720;
            canvas.height = 1280;
            img2.src = this.tracks["items"][0]["album"]["images"][1]["url"];
        };
        img2.onload = () => {
            img3.src = this.tracks["items"][1]["album"]["images"][1]["url"];
        };
        img3.onload = () => {
            img4.src = this.tracks["items"][2]["album"]["images"][1]["url"];
        };
        img4.onload = () => {
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            context.drawImage(img2, 35, 300, albumSize, albumSize);
            context.drawImage(img3, 35, 600, albumSize, albumSize);
            context.drawImage(img4, 35, 890, albumSize, albumSize);
            context.font = " bold 30px Poppins";
            context.fillText(this.tracks["items"][0]["name"], 300, 300);
            context.fillText(this.tracks["items"][1]["name"], 300, 600);
            context.fillText(this.tracks["items"][2]["name"], 300, 600);
        };
        background.src = 'assets/untitled.png';
    }
    mergeArtistImages() {
        var canvas = this.artistCanvas.nativeElement;
        var context = canvas.getContext('2d');
        let background = new Image();
        let img2 = new Image();
        let img3 = new Image();
        let img4 = new Image();
        let albumSize = 175;
        background.setAttribute('crossorigin', 'anonymous'); // works for me
        img2.setAttribute('crossorigin', 'anonymous'); // works for me
        img3.setAttribute('crossorigin', 'anonymous'); // works for me
        img4.setAttribute('crossorigin', 'anonymous'); // works for me
        background.onload = () => {
            canvas.width = 720;
            canvas.height = 1280;
            img2.src = this.artists["items"][0]["images"][1]["url"];
        };
        img2.onload = () => {
            img3.src = this.artists["items"][1]["images"][1]["url"];
        };
        img3.onload = () => {
            img4.src = this.artists["items"][2]["images"][1]["url"];
        };
        img4.onload = () => {
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            context.drawImage(img2, 35, 300, albumSize, albumSize);
            context.drawImage(img3, 35, 600, albumSize, albumSize);
            context.drawImage(img4, 35, 890, albumSize, albumSize);
            context.font = " bold 30px Poppins";
            context.fillText(this.artists["items"][0]["name"], 300, 300);
            context.fillText(this.artists["items"][1]["name"], 300, 700);
            context.fillText(this.artists["items"][2]["name"], 300, 890);
        };
        background.src = 'assets/untitled.png';
    }
    saveCanvasAs(canvas, fileName) {
        // get image data and transform mime type to application/octet-stream
        var canvasDataUrl = canvas.toDataURL()
            .replace(/^data:image\/[^;]*/, 'data:application/octet-stream'), link = document.createElement('a'); // create an anchor tag
        // set parameters for downloading
        link.setAttribute('href', canvasDataUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', fileName);
        // compat mode for dispatching click on your anchor
        if (document.createEvent) {
            var evtObj = document.createEvent('MouseEvents');
            evtObj.initEvent('click', true, true);
            link.dispatchEvent(evtObj);
        }
        else if (link.click) {
            link.click();
        }
    }
};
tslib_1.__decorate([
    ViewChild('canvas', { static: false })
], ShowComponent.prototype, "canvas", void 0);
tslib_1.__decorate([
    ViewChild('artistCanvas', { static: false })
], ShowComponent.prototype, "artistCanvas", void 0);
ShowComponent = tslib_1.__decorate([
    Component({
        selector: 'app-show',
        templateUrl: './show.component.html',
        styleUrls: ['./show.component.scss']
    })
], ShowComponent);
export { ShowComponent };
//# sourceMappingURL=show.component.js.map
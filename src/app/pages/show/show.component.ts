import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService, ScopesBuilder, AuthConfig, AuthService } from 'spotify-auth';
import { InfoService } from '../info-service';
import { switchMap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  constructor(private  authService:  AuthService, private infoSvc: InfoService, private tokenSvc: TokenService, private router: Router) { }
  private stream: Subscription | null = null;
  private stream1: Subscription | null = null;

  public  artists: {} = {};
  public  tracks: {} = {};
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('artistCanvas', {static: false}) artistCanvas: ElementRef;

  private context: CanvasRenderingContext2D;
  public selectedVal: string;
  public isLoggedIn: boolean = true;
  public trackLoading: boolean = true;
  public artistsLoading: boolean = true;
  public error : boolean = false
  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }

  /**
   * ngOngInit is the subscriber to the recentReleases endpoint, doesn't need unsubscribe
   */
  ngOnInit() {
    if(this.tokenSvc.oAuthToken == "") {
        this.isLoggedIn = false;
    }
    this.selectedVal = "track"
    const stream = this.tokenSvc.authTokens.pipe(switchMap((x) => {
      this.trackLoading = false;
      return this.infoSvc.fetchTopQuarantineTracks();
    }));
    this.stream = stream.subscribe((x) => {
        this.tracks = x
        this.mergeImages()
      }
    );

    const stream1 = this.tokenSvc.authTokens.pipe(switchMap((x) => {
        this.artistsLoading = false;
        return this.infoSvc.fetchTopQuarantineArtists();
    }));
    this.stream1 = stream1.subscribe((x) => {
        this.artists = x
        this.mergeArtistImages()
        }
    );
  }

  public shouldLoad() : boolean {
    if (this.isLoggedIn == false) {
        return false
    } else {
        if(this.trackLoading && this.artistsLoading) {
            return true;
        }
    }
  }

  redirect() {
    this.router.navigate(["recent-releases"])
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }
  public  login():  void {
    const scopes = new ScopesBuilder().withScopes(ScopesBuilder.HISTORY).build();
        const ac:  AuthConfig  = {
            client_id:  "8488d51a53dd43fe85935f65579801cb", 
            response_type:  "token",
            redirect_uri:  "http://localhost:4202/authorized", 
            state:  "",
            show_dialog:  true,
            scope:  scopes
        };
        this.authService.configure(ac).authorize(); // Magic happens here
    }

public mergeImages() {
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var context = canvas.getContext('2d');
    let background = new Image();
    let img2 = new Image();
    let img3 = new Image();
    let img4 = new Image();
    let albumSize = 175
    background.setAttribute('crossorigin', 'anonymous'); // works for me
    img2.setAttribute('crossorigin', 'anonymous'); // works for me
    img3.setAttribute('crossorigin', 'anonymous'); // works for me
    img4.setAttribute('crossorigin', 'anonymous'); // works for me

    background.onload = () => {
        canvas.width = 720;
        canvas.height = 1280;
        img2.src = this.tracks["items"][0]["album"]["images"][1]["url"]
    };
    img2.onload = () => {
        img3.src = this.tracks["items"][1]["album"]["images"][1]["url"]
    };
    img3.onload = () => {
        img4.src = this.tracks["items"][2]["album"]["images"][1]["url"]
    };
    img4.onload = () => {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.drawImage(img2, 35, 300, albumSize, albumSize);
        context.drawImage(img3, 35, 600, albumSize, albumSize);
        context.drawImage(img4, 35, 890, albumSize, albumSize);
        context.font = " bold 30px Poppins";
        context.fillStyle = "white";  //<======= and here

        context.fillText(this.tracks["items"][0]["name"], 327, 352);
        context.fillStyle = "black";  //<======= and here
        context.fillText(this.tracks["items"][0]["artists"][0]["name"], 327, 402);
        context.fillStyle = "white";  //<======= and here

        context.fillText(this.tracks["items"][1]["name"], 350, 670);
        context.fillStyle = "black";  //<======= and here
        context.fillText(this.tracks["items"][1]["artists"][0]["name"], 350, 710);
        context.fillStyle = "white";  //<======= and here

        context.fillText(this.tracks["items"][2]["name"], 350, 975);
        context.fillStyle = "black";  //<======= and here
        context.fillText(this.tracks["items"][2]["artists"][0]["name"], 350, 1015);


    };        
      
    background.src = 'assets/untitled.png';
}

public mergeArtistImages() {
    var canvas: HTMLCanvasElement = this.artistCanvas.nativeElement;
    var context = canvas.getContext('2d');
    let background = new Image();
    let img2 = new Image();
    let img3 = new Image();
    let img4 = new Image();
    let albumSize = 175

    background.setAttribute('crossorigin', 'anonymous'); // works for me
    img2.setAttribute('crossorigin', 'anonymous'); // works for me
    img3.setAttribute('crossorigin', 'anonymous'); // works for me
    img4.setAttribute('crossorigin', 'anonymous'); // works for me
    background.onload = () => {
        canvas.width = 720;
        canvas.height = 1280;

        img2.src = this.artists["items"][0]["images"][1]["url"]
    };
    img2.onload = () => {
        img3.src = this.artists["items"][1]["images"][1]["url"]
    };
    img3.onload = () => {
        img4.src = this.artists["items"][2]["images"][1]["url"]
    };
    img4.onload = () => {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.drawImage(img2, 35, 300, albumSize, albumSize);
        context.drawImage(img3, 35, 600, albumSize, albumSize);
        context.drawImage(img4, 35, 890, albumSize, albumSize);
        context.font = " bold 30px Poppins";
        context.fillText(this.artists["items"][0]["name"], 350, 370);
        context.fillText(this.artists["items"][1]["name"], 350, 680);
        context.fillText(this.artists["items"][2]["name"], 350, 990);

    };        
      
    background.src = 'assets/artist.png';
}
    public saveCanvasAs(canvas, fileName) {
        // get image data and transform mime type to application/octet-stream
        var
            canvasDataUrl = canvas.toDataURL()
                .replace(/^data:image\/[^;]*/, 'data:application/octet-stream'),
            link = document.createElement('a'); // create an anchor tag
    
        // set parameters for downloading
        link.setAttribute('href', canvasDataUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', fileName);
    
        // compat mode for dispatching click on your anchor
        if (document.createEvent) {
            var evtObj = document.createEvent('MouseEvents');
            evtObj.initEvent('click', true, true);
            link.dispatchEvent(evtObj);
        } else if (link.click) {
            link.click();
        }
    }
}


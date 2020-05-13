import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'spotify-auth';
import { InfoService } from '../info-service';
import { switchMap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  constructor(private infoSvc: InfoService, private tokenSvc: TokenService, private router: Router) { }

  private stream: Subscription | null = null;
  public  albums: {} = {};
  public selectedVal: string;
  public isLoggedIn: boolean = true;
  public loading: boolean = true;
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
      return this.infoSvc.fetchTopQuarantineTracks();
    }));
    this.stream = stream.subscribe((x) => this.albums = x);
  }

  /**
   * returns json string of the albums object
   */
  public get getRecent(): {} {
    return JSON.stringify(this.albums, null, 2);
  }

  redirect() {
    this.router.navigate(["recent-releases"])
  }

  /**
   * returns if there is any recent releases in the albums object
   */
  public hasRecent() : boolean {
    return !isEmpty(this.albums);
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }
}

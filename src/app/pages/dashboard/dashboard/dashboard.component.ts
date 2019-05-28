import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService, LocalStorageService } from '@app/core';
import { TripService } from '@app/core/service/trip-service';

const credentialsKey = 'credentials';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  private _credentials: Authentication.Credentials | null;
  private _upComingTrips: any;
  private _pastTrips: any;

  constructor(
    private auth: AuthenticationService,
    private localStorageService: LocalStorageService,
    private trip: TripService,
  ) { 
    const savedCredentials = this.localStorageService.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  ngOnInit() {
    this.auth.getCredentials().subscribe((v) => {
      this._credentials = v;
    });
  }

  ngAfterViewInit() {
    this.getUpComingTrips();
    this.getPastTrips();
  }


  private getUpComingTrips() {
    this.trip.upComingTrips(this._credentials.data.id).subscribe((v) => {
      if (v.status) {
        this._upComingTrips = v && typeof v.data !== 'undefined' ? v.data : [];
      }
    });
  }

  private getPastTrips() {
    this.trip.pastTrips(this._credentials.data.id).subscribe((v) => {
      if (v.status) {
        this._pastTrips = v && typeof v.data !== 'undefined' ? v.data : [];
      }
    });
  }
}

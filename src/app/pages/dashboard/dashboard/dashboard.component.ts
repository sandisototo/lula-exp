import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService, LocalStorageService } from '@app/core';
import { TripService } from '@app/core/service/trip-service';

const credentialsKey = 'credentials';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private _credentials: Authentication.Credentials | null;
  private _upComingTrips: any;
  private _pastTrips: any;
  public lat = 30.5595;
  public lng = 22.9375;
  public zoom = 12;

  public origin: any;
  public destination: any;
  showDirections: boolean;

  constructor(
    private auth: AuthenticationService,
    private localStorageService: LocalStorageService,
    private trip: TripService
  ) {
    const savedCredentials = this.localStorageService.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  ngOnInit() {
    this.auth.getCredentials().subscribe(v => {
      this._credentials = v;
    });
  }

  ngAfterViewInit() {
    this.getUpComingTrips();
    this.getPastTrips();
  }

  getDirection(item: any) {
    this.origin = {
      lat: item.schedule_data.start_address_lat,
      lng: item.schedule_data.start_address_lng
    };
    this.destination = {
      lat: item.schedule_data.end_address_lat,
      lng: item.schedule_data.end_address_lng
    };
  }

  toogleShowDirections(item: any) {
    this.getDirection(item);
    this.showDirections = !this.showDirections;
  }

  private getUpComingTrips() {
    this.trip.upComingTrips(this._credentials.data.id).subscribe(v => {
      if (v.status) {
        this._upComingTrips = v && typeof v.data !== 'undefined' ? v.data : [];
      }
    });
  }

  private getPastTrips() {
    this.trip.pastTrips(this._credentials.data.id).subscribe(v => {
      if (v.status) {
        this._pastTrips = v && typeof v.data !== 'undefined' ? v.data : [];
      }
    });
  }
}

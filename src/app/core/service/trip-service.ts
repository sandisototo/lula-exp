import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HeaderConfigService } from '../http/header-config';

@Injectable()
export class TripService {
    public upComingTrips$ = new Subject<any>();
    _upComingTrips: any;
    public pastTrips$ = new Subject<any>();
    _pastTrips: any;
    constructor(
        private httpClient: HttpClient,
        private headerConfigService: HeaderConfigService
    ) { }

    upComingTrips(
        user_id: number
    ): Observable<any> {
        return this.httpClient.get(`/upcoming-trips/${user_id}`, this.headerConfigService.renderRequestHeaders()).pipe(
            map((body: any) => {
                this.setUpcomingTrips(body);
                return body;
            })
        );
    }

    private setUpcomingTrips(trips?: any) {
        this._upComingTrips = trips || null;
        if (trips) {
            this.upComingTrips$.next(this._upComingTrips);
        }
    }

    getUpComingTrips(): Observable<any> {
        return this.upComingTrips$.asObservable();
    }

    pastTrips(
        user_id: number
    ): Observable<any> {
        return this.httpClient.get(`/past-trips/${user_id}`, this.headerConfigService.renderRequestHeaders()).pipe(
            map((body: any) => {
                this.setPastTrips(body);
                return body;
            })
        );
    }

    private setPastTrips(trips?: any) {
        this._pastTrips = trips || null;
        if (trips) {
            this.pastTrips$.next(this._pastTrips);
        }
    }

    getPastTrips(): Observable<any> {
        return this.pastTrips$.asObservable();
    }
}

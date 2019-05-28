import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import {
  AuthenticationGuard,
  AuthenticationService
} from '@app/core/service/authentication';
import {
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  HttpService
} from '@app/core/http';
import { LocalStorageService } from '@app/core/local-storage.service';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
import {
  ErrorMessageService,
  UserService,
  UtilService
} from '@app/core/service';
import { HeaderConfigService } from './http/header-config';
import { TripService } from './service/trip-service';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [],
  providers: [
    LocalStorageService,
    AuthenticationService,
    TripService,
    AuthenticationGuard,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    UserService,
    UtilService,
    HeaderConfigService,
    ErrorMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {}

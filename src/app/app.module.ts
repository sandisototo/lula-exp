import * as $ from 'jquery';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutes } from '@app/app.routing';
import { AppComponent } from '@app/app.component';
import { CoreModule, customNotifierOptions } from '@app/core';
import { SharedModule } from '@app/shared';
import { NotifierModule } from 'angular-notifier';
import { AgmCoreModule } from '@agm/core'; // @agm/core
import { AgmDirectionModule } from 'agm-direction'; // agm-direction

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    CoreModule,
    SharedModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

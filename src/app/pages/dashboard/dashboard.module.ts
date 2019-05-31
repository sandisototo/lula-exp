import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutes } from '@app/pages/dashboard/dashboard.routing';
import { DashboardComponent } from '@app/pages/dashboard/dashboard/dashboard.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(DashboardRoutes),
    AgmCoreModule.forRoot({
      // @agm/core
      apiKey: 'AIzaSyCqVUiOr-8RVFX_SPgF0uQNVWq_h_XY0so'
    }),
    AgmDirectionModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}

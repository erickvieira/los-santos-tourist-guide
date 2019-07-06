import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { LivemapModule } from '../components/livemap/livemap.module';
import { TouristSpotService } from '../services/tourist-spot.service';
import { ToolbarMenuComponent } from '../components/toolbar-menu/toolbar-menu.component';

@NgModule({
  declarations: [
    ToolbarMenuComponent,
    HomePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LivemapModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ]
})
export class HomePageModule {}

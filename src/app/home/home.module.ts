import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LivemapModule } from '../components/livemap/livemap.module';
import { TouristSpotService } from '../services/tourist-spot.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivemapModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

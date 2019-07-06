import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddSpotComponent } from './add-spot/add-spot.component';

@NgModule({
  declarations: [
    AddSpotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    AddSpotComponent
  ],
  entryComponents: [
    AddSpotComponent
  ]
})
export class TouristSpotsModule { }

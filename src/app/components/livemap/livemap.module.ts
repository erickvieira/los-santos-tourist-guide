import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivemapComponent } from './livemap.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LivemapComponent,
  ],
  declarations: [
    LivemapComponent,
  ],
  entryComponents: [
    LivemapComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class LivemapModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditComponent
  ],
  entryComponents: [
    EditComponent
  ]
})
export class UsersModule { }

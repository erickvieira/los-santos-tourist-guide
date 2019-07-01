import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LivemapModule } from '../components/livemap/livemap.module';
import { ToolbarMenuComponent } from '../components/toolbar-menu/toolbar-menu.component';
import { AddComponent } from './add/add.component';
import {AuthGuard} from "../guard/auth.guard";

@NgModule({
  declarations: [
    ToolbarMenuComponent,
    HomePage,
    AddComponent
  ],
  exports: [
      AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivemapModule,
    RouterModule.forChild([
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: '',
        component: HomePage
      }
    ])
  ]
})
export class HomePageModule {}

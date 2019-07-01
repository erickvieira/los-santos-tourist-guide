import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LivemapModule } from "../components/livemap/livemap.module";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivemapModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ])
  ]
})
export class LoginModule { }

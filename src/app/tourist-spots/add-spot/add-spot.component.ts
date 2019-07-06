import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

import CategoriesList from '../../models/categoriesList';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.scss'],
})
export class AddSpotComponent implements OnInit {

  public addSpotForm: FormGroup;
  public categoriesList = CategoriesList;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private interServ: InteractionService,
    private router: Router,
    public modalCtrl: ModalController) { }

  // name: string; categories: string[]; coordinates: Coordinates;

  async ngOnInit() {

    this.addSpotForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      categories: ['', [
        Validators.required
      ]],
      lat: ['', [
        Validators.required
      ]],
      lng: ['', [
        Validators.required
      ]]
    });
    if (this.userServ.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  async addSpot() {
    const loading = await this.interServ.presentGenericLoading();
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}

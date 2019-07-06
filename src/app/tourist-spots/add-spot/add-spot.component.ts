import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

import CategoriesList from '../../models/categoriesList';
import { TouristSpotService } from 'src/app/services/tourist-spot.service';

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
    private tourSpotService: TouristSpotService,
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
      description: ['', [
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
      ]],
      capability: ['', [
        Validators.required
      ]],
      ticket: ['', [
        Validators.required
      ]],
    });
    if (this.userServ.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  async addSpot() {
    // const loading = await this.interServ.presentGenericLoading();
    const spot = await this.tourSpotService.add(this.addSpotForm.value).toPromise();
    console.log(spot);
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}

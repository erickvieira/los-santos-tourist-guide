import { ITouristSpot } from 'functions/src/models/tourist-spot';
import { Coordinates } from './../../../../functions/src/models/coordinates';
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
      maxCapability: ['', [
        Validators.required
      ]],
      ticketPrice: ['', [
        Validators.required
      ]],
    });
    if (this.userServ.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  async addSpot() {
    // const loading = await this.interServ.presentGenericLoading();
    let { name, description, categories, lat, lng, maxCapacity, ticketPrice } = this.addSpotForm.value;

    let businessHours = {
      day: 'mon',
      opensAt: '08:00',
      closesAt: '18:00'
    };

    let coordinates = {
      lat: lat,
      lng: lng
    }

    let touristSpot = {
      name: name,
      description: description,
      adjacentStreets: [],
      icon: '',
      maxCapacity: maxCapacity,
      ticketPrice: ticketPrice,
      allowsPet: false,
      allowsPhotography: false,
      hasMetalDetector: false,
      categories: categories,
      accessibilityItems: [],
      businessHours: null,
      coordinates: coordinates,
      rating: null,
      ageGroup: null
    };

    const spot = await this.userServ.createTouristspot(touristSpot).toPromise();
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}

// name: string;
// description: string;
// adjacentStreets: string[];
// icon: string;
// maxCapacity ?: number;
// ticketPrice: number | 'free';
// allowsPet ?: boolean;
// allowsPhotography ?: boolean;
// hasMetalDetector ?: boolean;
// categories: Categories[];
// accessibilityItems ?: Accessibility[];
// businessHours: BusinessHours[]; day: Weekday; opensAt: string; closesAt: string;
// coordinates: Coordinates;
// rating ?: TinyRating[];
// ageGroup ?: AgeGroup[];

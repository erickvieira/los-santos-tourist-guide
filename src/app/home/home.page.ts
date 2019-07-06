import { Component, OnInit } from '@angular/core';
import { TouristSpotService } from '../services/tourist-spot.service';
import { TouristSpot } from '../../../functions/src/models/tourist-spot';
import { easyInOutVer } from '../models/animations';
import { InteractionService } from '../services/interaction.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { AddSpotComponent } from '../tourist-spots/add-spot/add-spot.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    easyInOutVer,
  ]
})
export class HomePage implements OnInit {

  showFilters = false;
  spots: TouristSpot[] = null;
  currentCategory: string;
  firstTime = true;

  constructor(
    private userServ: UserService,
    private spotServ: TouristSpotService,
    private intServ: InteractionService,
    private modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    if (!this.firstTime) {
      return;
    }
    this.spotServ.getList().subscribe((data) => {
      this.spots = data;
    }, _ => {
      this.intServ.presentGenericAlert({
        header: 'Oops',
        message: `Unexpected error occurred`
      });
    });
    if (this.currentCategory) {
      this.firstTime = false;
      this.currentCategory = undefined;
    }
  }

  async onSelectCategory(category: string) {
    const loading = await this.intServ.presentGenericLoading();
    this.spotServ.getListByCategory(category).subscribe((data) => {
      loading.dismiss();
      if (data) {
        this.currentCategory = category;
        this.spots = data;
      } else {
        this.intServ.presentGenericAlert({
          header: 'Sorry',
          message: `No items found for '${category}'.`
        });
      }
    }, _ => {
      loading.dismiss();
      this.intServ.presentGenericAlert({
        header: 'Sorry',
        message: `No items found for '${category}'.`
      });
    });
  }

  help() {
    this.intServ.presentGenericAlert({
      header: 'Los Santos Tourist Guide',
      subHeader: 'How to use',
      message: `You can tap on filter button (on top right corner)
      and select a category to filter the pins.<br>
      When it's returns values, the map will reload with the new pins.<br>
      Otherwise, it will present a error message.`
    });
  }

  async add() {
    const modal = await this.modalController.create({
      component: AddSpotComponent,
      animated: true
    });
    return await modal.present();
  }

  async logout() {
    this.userServ.logout();
  }

}

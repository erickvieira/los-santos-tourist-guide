import { Component, OnInit, Input } from '@angular/core';
import { TouristSpotService } from '../services/tourist-spot.service';
import { TouristSpot } from '../../../functions/src/models/tourist-spot';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  spots: TouristSpot[] = [];

  constructor(private touristSpot: TouristSpotService) {}

  ngOnInit() {
    this.touristSpot.getTouristSpots()
      .subscribe((data) => {
        this.spots = data;
      });
  }

  onSelectCategory(categoryName: string) {
    console.log(categoryName);
    this.touristSpot.getTouristSpotsByCategory(categoryName).subscribe((data) => {
      this.spots = data;
    });
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
})
export class ToolbarMenuComponent implements OnInit {

  @Output() onSelectCategory = new EventEmitter();

  constructor(private navCtrl: NavController,
              private loginService: LoginService) { }

  ngOnInit() {}

  onGetPoints(categoryName: string) {
    this.onSelectCategory.emit({'category': categoryName});
  }

  addTouristSpot() {
    return this.navCtrl.navigateRoot('/home/add');
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { categoriesToArray } from 'functions/src/models/categories';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
})
export class ToolbarMenuComponent implements OnInit {

  @Output('on-select-category') onSelectCategory = new EventEmitter<string>();
  
  readonly categories = categoriesToArray();
  readonly icons = {};
  readonly labels = {};

  constructor(
    private intServ: InteractionService,
  ) { }

  ngOnInit() {
    this.buildAditionalData();
  }

  emitCategory(category: string) {
    this.onSelectCategory.emit(this.labels[category]);
  }

  details(category: string) {
    this.intServ.presentGenericToast({ message: category });
  }

  buildAditionalData() {
    this.categories.forEach(c => {
      switch (c) {
        case 'SPORT':
          this.icons[c] = 'football';
          this.labels[c] = 'sport';
          break;
        case 'FOOD':
          this.icons[c] = 'pizza';
          this.labels[c] = 'food';
          break;
        case 'HEALTH_CARE':
          this.icons[c] = 'fitness';
          this.labels[c] = 'health care';
          break;
        case 'FUN':
          this.icons[c] = 'contacts';
          this.labels[c] = 'fun';
          break;
        case 'BUSINESS':
          this.icons[c] = 'business';
          this.labels[c] = 'business';
          break;
        case 'RACING':
          this.icons[c] = 'speedometer';
          this.labels[c] = 'racing';
          break;
        case 'AVIATION':
          this.icons[c] = 'airplane';
          this.labels[c] = 'aviation';
          break;
        case 'NAUTICAL':
          this.icons[c] = 'boat';
          this.labels[c] = 'nautical';
          break;
        case 'SOCIALIZING':
          this.icons[c] = 'beer';
          this.labels[c] = 'socializing';
          break;
        case 'SHOPPING':
          this.icons[c] = 'cart';
          this.labels[c] = 'shopping';
          break;
        case 'PUBLIC':
          this.icons[c] = 'globe';
          this.labels[c] = 'public area';
          break;
        case 'PRIVATE':
          this.icons[c] = 'wine';
          this.labels[c] = 'private area';
          break;
      }
    });
  }

}

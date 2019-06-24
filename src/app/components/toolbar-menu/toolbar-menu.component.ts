import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
})
export class ToolbarMenuComponent implements OnInit {

  @Output() onSelectCategory = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onGetPoints(categoryName: string) {
    this.onSelectCategory.emit({'category': categoryName});
  }

}

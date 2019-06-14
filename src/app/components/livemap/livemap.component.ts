/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'overlay-map',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.scss'],
})
export class LivemapComponent implements OnInit {

// tslint:disable-next-line: no-input-rename
  @Input('img') srcImage: string;
  @Input('markers') markers: Array<google.maps.LatLng> = [];
  overlay: any = undefined;

  constructor() { }

  ngOnInit() {
    google.maps.event.addDomListener(window, 'load', () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 33.738177, lng: -118.813650 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(33.709254, -118.855531),
        new google.maps.LatLng(33.812495, -118.767535)
      );
      this.overlay = new USGSOverlay(bounds, this.srcImage, map);
    });
  }

}

export class USGSOverlay extends google.maps.OverlayView {

  div: any = null;

  constructor(
    public bounds: google.maps.LatLngBounds,
    public image: string,
    public map: google.maps.Map
  ) {
    super();
    this.div = null;
    super.setMap(map);
  }

  draw() {
    const overlayProjection = super.getProjection();
    const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
    const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());
    const div = this.div;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  }

  onAdd() {
    const div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    const img = document.createElement('img');
    img.src = this.image;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);
    this.div = div;
    const panes = super.getPanes();
    panes.overlayLayer.appendChild(div);
  }

  onRemove() {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }

}

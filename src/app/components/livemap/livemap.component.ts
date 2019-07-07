/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { TinyTouristSpot } from 'functions/src/models/tourist-spot';
import { TouristSpotService } from 'src/app/services/tourist-spot.service';

@Component({
  selector: 'overlay-map',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.scss'],
})
export class LivemapComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('img') srcImage: string;
  @Input('spots') spots: Array<TinyTouristSpot> = [];
  overlay: any = undefined;

  // tslint:disable-next-line:member-ordering
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private readonly mapCenter = { lat: 33.738177, lng: -118.813650 };

  markers: google.maps.Marker[] = [];

  constructor(private spotServ: TouristSpotService) { }

  ngOnInit() {
    google.maps.event.addDomListener(window, 'load', () => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: this.mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        zoomControl: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        streetViewControl: false
      });
      this.map.addListener('click', (e) => {
        console.log({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      });
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (this.spots && changes.spots.currentValue !== changes.spots.previousValue) {
      if (changes.spots.previousValue) {
        this.markers.forEach(m => {
          m.setMap(null);
        });
        this.markers = [];
        this.map.setCenter(this.mapCenter);
        this.map.setZoom(13);
      }
      this.spots.forEach(async s => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(s.coordinates.lat, s.coordinates.lng),
          title: s.name,
          animation: google.maps.Animation.DROP,
          icon: '../../../assets/imgs/pin.svg',
        });
        const infowindow = new google.maps.InfoWindow({
          maxWidth: 250,
          content: await this.buildMapLabel(s.id),
        });
        marker.setMap(this.map);
        this.markers.push(marker);
        // tslint:disable-next-line:no-shadowed-variable
        google.maps.event.addListener(marker, 'click', (marker => {
          return function() {
            // infowindow.setContent(this.label);
            infowindow.open(this.map, marker);
          };
        })(marker));
      });
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(33.709254, -118.855531),
        new google.maps.LatLng(33.812495, -118.767535)
      );
      // tslint:disable-next-line: no-use-before-declare
      this.overlay = new USGSOverlay(bounds, this.srcImage, this.map);
    }
  }

  edit() {
    alert('edit');
  }

  async buildMapLabel(spotId: string) {
    const full = await this.spotServ.details(spotId).toPromise();
    return `
      <h6 style="color: #7044ff; margin: 0 !important;">
        ${full.name}
      </h6>
      <div style="color: #999; font-weight: 500;">
        <div style="width: 100%; font-size: 14px; margin-bottom: 6px">
          <b>${full.description || 'no description'}</b>
        </div>
        <div style="display: flex;">
          <div style="flex: 2">Capacity:</div>
          <div style="flex: 2; text-align: right; color: #666">
            <b>${full.maxCapacity || 'unknown'}</b>
          </div>
        </div>
        <div style="display: flex;">
          <div style="flex: 2">Ticket:</div>
          <div style="flex: 2; text-align: right; color: #666">
            <b>${typeof full.ticketPrice === 'string' ? full.ticketPrice : 'US$\t' +
             Math.floor(full.ticketPrice).toFixed(2) || 'unknown'}</b>
          </div>
        </div>
        <div style="width: 100%; text-align: center; margin-top: 5px">
          <small style="background-color: #7044ff; padding: 1px 4px;
           border-radius: 3px; color: white; box-shadow: 0px 0px 8px 0px #7044ffa3;">
            ${full.categories.join(' 🞄 ')}
          </small>
        </div>
      </div>
    `;
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

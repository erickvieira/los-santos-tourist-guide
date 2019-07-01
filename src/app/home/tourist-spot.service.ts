import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristSpot } from '../../../functions/src/models/tourist-spot';

@Injectable({
  providedIn: 'root',
})
export class TouristSpotService {

  BASE_URL = 'https://us-central1-los-santos-tourist-guide.cloudfunctions.net/tgapi/';

  constructor(private http: HttpClient) {}

  getTouristSpots(): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(this.BASE_URL + 'spot/');
  }

  getTouristSpotsByCategory(spotCategory: string): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(this.BASE_URL + 'spot/' + spotCategory);
  }
}

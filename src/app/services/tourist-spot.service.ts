import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristSpot } from '../../../functions/src/models/tourist-spot';
import { baseUrl } from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class TouristSpotService {

  constructor(private http: HttpClient) {}

  getList(): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(`${baseUrl}/spot/`);
  }

  details(id: string) {
    return this.http.get<TouristSpot>(
      `${baseUrl}/spot/${id}`
    );
  }

  getListByCategory(spotCategory: string): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(`${baseUrl}/spot?category=${spotCategory}`);
  }

  getRatings(spotId: string) {
    return this.http.get(
      `${baseUrl}/spot/${spotId}/ratings`
    );
  }

}

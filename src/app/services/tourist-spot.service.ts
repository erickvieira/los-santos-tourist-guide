import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristSpot } from '../../../functions/src/models/tourist-spot';

@Injectable({
  providedIn: 'root',
})
export class TouristSpotService {

  constructor(private http: HttpClient) {}

  getSome(): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>('https://us-central1-los-santos-tourist-guide.cloudfunctions.net/api/spot/')
  }
}

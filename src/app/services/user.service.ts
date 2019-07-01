import { Injectable } from '@angular/core';
import { User, IUser } from 'functions/src/models/user';
import { HttpClient } from '@angular/common/http';
import { baseUrl, jsonRequest } from '../models/constants';
import { IRating } from 'functions/src/models/rating';
import { ITouristSpot, TouristSpot } from 'functions/src/models/tourist-spot';

@Injectable({
  providedIn: 'root'
})
export class UserService {

// tslint:disable: variable-name
  private _instance: User;

  get instance() {
    if (this._instance) {
      return this._instance;
    } else {
      const currentUserJson = localStorage.getItem('currentUser');
      if (currentUserJson) {
        this._instance = JSON.parse(currentUserJson);
      } else {
        this._instance = {} as User;
      }
      return this._instance;
    }
  }

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.instance && this.instance.id;
  }

  login(email: string, password: string) {
    return this.http.post<User>(
      `${baseUrl}/login`,
      { email, password },
      { headers: jsonRequest }
    );
  }

  register(user: IUser) {
    return this.http.post(
      `${baseUrl}/register`,
      user,
      { headers: jsonRequest }
    );
  }

  update(id: string, user: IUser) {
    return this.http.patch(
      `${baseUrl}/user/${id}`,
      user,
      { headers: jsonRequest }
    );
  }

  details(id: string) {
    return this.instance.id !== id ? this.http.get(
      `${baseUrl}/user/${id}`
    ) : this.instance;
  }

  delete(id: string) {
    if (this.instance.role === 'admin') {
      throw { message: 'you must be an administrator to delete users' };
    }
    return this.http.delete(
      `${baseUrl}/user/${id}`
    );
  }

  promote(id: string) {
    if (this.instance.role === 'admin') {
      throw { message: 'you must be an administrator to promote users' };
    }
    return this.http.post(
      `${baseUrl}/user/${id}/promote`,
      {}
    );
  }

  demote(id: string) {
    if (this.instance.role === 'admin') {
      throw { message: 'you must be an administrator to demote users' };
    }
    return this.http.post(
      `${baseUrl}/user/${id}/demote`,
      {}
    );
  }

  createTouristspot(spot: ITouristSpot) {
    if (this.instance.role === 'admin') {
      throw { message: 'you must be an administrator to create touristspots' };
    }
    return this.http.post(
      `${baseUrl}/spot`,
      spot,
      { headers: jsonRequest }
    );
  }

  deleteTouristspot(spotId: string) {
    if (this.instance.role === 'admin') {
      throw { message: 'you must be an administrator to delete touristspots' };
    }
    return this.http.delete(
      `${baseUrl}/spot/${spotId}`
    );
  }

  updateTouristspot(spotId: string, spot: TouristSpot | Partial<TouristSpot>) {
    if (this.instance.role === 'admin') {
      throw { message: 'you must be an administrator to update touristspots' };
    }
    return this.http.patch(
      `${baseUrl}/spot/${spotId}`,
      spot,
      { headers: jsonRequest }
    );
  }

  getRatings(userId: string) {
    return this.http.get(
      `${baseUrl}/user/${userId}/ratings`
    );
  }

  rate(rating: IRating) {
    return this.http.post(
      `${baseUrl}/rating`,
      rating,
      { headers: jsonRequest }
    );
  }

}

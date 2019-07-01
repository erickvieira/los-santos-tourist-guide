import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class EnvService {
    API_URL = 'https://us-central1-los-santos-tourist-guide.cloudfunctions.net/tgapi/';

    constructor() { }
}
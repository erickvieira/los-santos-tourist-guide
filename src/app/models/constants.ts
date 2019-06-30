import { HttpHeaders } from '@angular/common/http';

const production = 'https://us-central1-los-santos-tourist-guide.cloudfunctions.net/tgapi';
// const test = 'http://localhost:5000/los-santos-tourist-guide/us-central1/tgapi';
export const baseUrl = production;

export const jsonRequest = new HttpHeaders().set('content-type', 'application/json');

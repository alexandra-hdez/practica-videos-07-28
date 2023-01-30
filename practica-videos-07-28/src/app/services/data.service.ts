import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface City {
  _id: string;
  name: string;
}

const initCity: City = {
  _id: '',
  name: ''
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
private city$ = new BehaviorSubject<City>(initCity);
  
  URL_API = 'https://crudcrud.com/api/e0d6ba04535e4351b8b1d1ff12d74f5e/cities';

  constructor(private readonly http: HttpClient) { }

  get SelectedCity$():Observable<City> {
    return this.city$.asObservable();
  }

  setCity(city:City): void{
    this.city$.next(city);
  }

  addNewCity(city: string):Observable<City>{
    const body = {name: city};
    return this.http.post<City>(this.URL_API, body);
  }
  getCities():Observable<City>{
    return this.http.get<City>(this.URL_API);
  }

  updateCity(city:City):Observable<void>{
    const body = {name: city.name};
    return this.http.put<void>(`${this.URL_API}/${city._id}`, body);
   }

  deleteCity(id: string): Observable<void>{ 
    return this.http.delete<void>(`${this.URL_API}/${id}`);
  }
}

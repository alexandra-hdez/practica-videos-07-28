import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { City, DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(NgModel) filterInput!: NgModel;

  cities: City[] = [];
  selection!: City;
  criteria = ''

  title = 'practica18-23';

  constructor(private readonly dataSvc: DataService) {}

  ngAfterViewInit(): void {
    this.filterInput.valueChanges?.subscribe(res => {
      console.log('res', res);
      this.filter(res);
    })
  }

  ngOnInit(): void {
    this.dataSvc.SelectedCity$.subscribe((city: City) => this.selection = city)
    // this.dataSvc.getCities()
    // .subscribe(cities => {
    //   // this.cities = [... cities];
    // });
  }

  filter(query:string): void {
    console.log('query', query);
  }

  updateCity(city: City): void{
    this.dataSvc.updateCity(city).subscribe(res => {
      const tempArr = this.cities.filter(item => item._id !== city._id);
      this.cities = [...tempArr, city];
      this.onClear();
    });
  }
  
  addNewCity(city: string): void{
    this.dataSvc.addNewCity(city).subscribe(res =>{
      this.cities.push(res);
    });
  }

  onCitySelected(city: City):void{
    // console.log('City ->', city);
    // this.selection = city;
    this.dataSvc.setCity(city);
  }

  onCityDelete(id: string): void {
    if (confirm('Are you sure?')){
        this.dataSvc.deleteCity(id).subscribe (() => {
            const tempArr = this.cities.filter(city => city._id !== id);
            this.cities = [...tempArr];
            this.onClear();
        });
    }

  }

  onClear(): void{
    this.selection = {
      _id: '',
      name: ''
    };
  }

  
}

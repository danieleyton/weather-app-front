import { Component, OnInit, AfterViewInit } from '@angular/core';
import {WeatherControllerService} from '../api/services/weather-controller.service'
import { ActivatedRoute, ParamMap } from "@angular/router";
import { retry } from "rxjs/operators";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, AfterViewInit {

  weather: string = '';
  temp: number = 0;
  name: string = '';
  hours: number = 0;
  minutes: number = 0;

  constructor(private weatherService: WeatherControllerService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('countryName'));
      this.name = params.get('countryName')!;
      this.getWeather(this.name);
    })
    //this.weather = '';
    //this.temp = 0;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('countryName')!;
      //console.log(params.get('countryName'));
    })
    this.getWeather(this.name);
  }

  ngAfterViewInit() {
  }

  getTime(timestamp: number, timezone: number) {
    var time = timestamp + timezone + 10800
    var date = new Date(time*1000);
    return date;
  }


  getWeather(name: string): void {
    this.weatherService.getWeather({countryName: name}).pipe(retry()).subscribe(res =>
      {
        this.weather = JSON.parse(res).weather[0].description;
        this.temp = JSON.parse(res).main.temp;
        var date = this.getTime(JSON.parse(res).dt, JSON.parse(res).timezone)
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        //console.log(JSON.parse(res).main.temp)
      }, (err) => {
        console.log(err.message);
      }
    )
  }

}

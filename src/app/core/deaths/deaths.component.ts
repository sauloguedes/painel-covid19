import { Component, OnInit } from '@angular/core';
import { obitosAcumulados } from './data/obitosAcumulados';
import { obitosPorDia } from './data/obitosPorDia';

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.css']
})
export class DeathsComponent implements OnInit {

  public data = [];

  public view: any[] = [];

  colorScheme = {
    domain: ['#5AA454']
  };

  private days = obitosAcumulados.length

  public mediaObitosDia: number = 27878 / this.days

  constructor() { }

  ngOnInit(): void {

    this.setObitosAcumulado()

  }

  setObitosAcumulado(): void {
    this.data = obitosAcumulados
  }

  setObitosPordia(): void {
    this.data = obitosPorDia
  }

}

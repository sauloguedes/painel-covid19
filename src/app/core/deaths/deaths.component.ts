import { Component, OnInit } from '@angular/core';
import { obitosAcumulados } from './data/obitosAcumulados';
import { obitosPorDia } from './data/obitosPorDia';
import { obitosPorIdade } from './data/obitosPorIdade';
import { Dados } from './data/data.model';
import { obitosPorGenero } from './data/obitosPorGenero';

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.css']
})
export class DeathsComponent implements OnInit {

  //
  public countDeaths: number
  //
  public letalidade: number
  //
  public mortalidade: number

  //
  public data: Dados[];

  //
  public colorScheme = {
    domain: ['#7d6b80']
  };

  //
  private days = obitosAcumulados.length

  //
  public mediaObitosDia: number

  // Gráficos de Distribuição por idade
  public deathsByAge: Dados[]

  // Gráficos de Distribuição por genero
  public deathsByGender: Dados[]

  public colorSchemeDeathsByGender = {
    domain: ['#97CBEC', '#F7ABD5']
  }

  constructor() { }

  ngOnInit(): void {

    this.setObitosPordia()

    this.countDeaths = 27878

    this.letalidade = 6.0

    this.mortalidade = 14.8

    this.deathsByAge = obitosPorIdade

    this.deathsByGender = obitosPorGenero

    this.mediaObitosDia = this.countDeaths / this.days

  }

  setObitosAcumulado(): void {
    this.data = obitosAcumulados
  }

  setObitosPordia(): void {
    this.data = obitosPorDia
  }

}

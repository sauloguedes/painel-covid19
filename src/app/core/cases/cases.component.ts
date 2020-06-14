import { Component, OnInit } from '@angular/core';

import { CoronaBrService } from '../services/coronabr.service';

import { estados } from '../data-json/estados';
import { EstadoResult } from '../models/CoronaBrRequest';
import { GraphData } from '../models/graph.model';
import { Estado } from '../models/estado.model';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  public estados = estados
  private estadoSelected: any;

  public loadingCasos: boolean
  public loadingObitos: boolean

  public countCasos: number
  public countCasosRecuperados: number
  public countCasosAtivos: number
  public casosTxIncidencia: number

  public dadosCasos = []
  public dadosCasosAcumulados = [];
  public dadosCasosDia = [];

  // Dados gráfico casos distribuição por gênero
  public casesByGender: any[] = []
  // Flag possui dados
  public hasCasesByGender: boolean;

  // Dados gráfico casos distribuição por idade
  public casesByAge: any[] = []
  //  Flag possui dados
  public hasCasesByAge: boolean;
  /// Cores do gráfico
  public colorSchemeCasesByAge = {
    domain: ['#5AA454']
  };

  //
  public countObitos: number
  public obitosTxLetalidade: number
  public obitosTxMortalidade: number
  public obitosUltimoPeriodo: number

  //
  public obitosColorScheme = {
    domain: ['#7d6b80']
  };

  public dadosObitos = [];
  public dadosObitosAcumulados = [];
  public dadosObitosDia = [];

  // Dados gráfico obitos distribuição por gênero
  public obitosByGender: any[] = []
  // Flag possui dados
  public hasObitosByGender: boolean;
  // Cores do gráfico
  public colorSchemeObitosByGender = {
    domain: ['#97CBEC', '#F7ABD5']
  }

  // Dados gráfico obitos distribuição por idade
  public obitosByAge: any[] = []
  //  Flag possui dados
  public hasObitosByAge: boolean;

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Casos';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454']
  };

  // Cores do gráfico de distribuição por genero
  public colorSchemeByGender = {
    domain: ['#97CBEC', '#B92F77']
  }

  public dataStatusCases

  constructor(
    private coronaService: CoronaBrService
  ) { }

  ngOnInit(): void {

    this.selectEstado("MA")

  }

  public selectEstado(uf: string): void {

    // Call spinner service

    // Set the selected state
    [this.estadoSelected] = this.estados.filter(e => e.uf == uf)

    // Fetch data from Brasil.io
    this.coronaService.getData(uf).subscribe(data => {

      let lastData = data.results[0]

      this.countCasos = lastData.last_available_confirmed

      this.casosTxIncidencia = lastData.last_available_confirmed_per_100k_inhabitants

      this.countObitos = lastData.last_available_deaths

      this.obitosTxLetalidade = lastData.last_available_death_rate * 100

      this.obitosTxMortalidade = (lastData.last_available_deaths / this.estadoSelected.populacao) * 100000

      this.obitosUltimoPeriodo = lastData.new_deaths

      this.getDadosCasosPorDia(data.results)

      this.getDadosCasosAcumulados(data.results)

      this.getDadosObitosPorDia(data.results)

      this.getDadosObitosAcumulados(data.results)

    }, erro => console.log(erro),

      () => {

        console.log(this.estadoSelected)

        this.countCasosRecuperados = this.estadoSelected.recuperados

        this.countCasosAtivos = this.countCasos - this.countCasosRecuperados - this.countObitos

        this.setDataPordia()

        this.setObitosPordia()

        this.setStatusCases()


      }

    )
    // Hide spinner

    //
    this.setCasesDataByAge(this.estadoSelected.epidemiologiaCasos ? this.estadoSelected.epidemiologiaCasos.idade : null)

    //
    this.setCasesDataByGender(this.estadoSelected.epidemiologiaCasos ? this.estadoSelected.epidemiologiaCasos.genero : null)

    //
    this.setObitosDataByAge(this.estadoSelected.epidemiologiaObitos ? this.estadoSelected.epidemiologiaObitos.idade : null)

    //
    this.setObitosDataByGender(this.estadoSelected.epidemiologiaObitos ? this.estadoSelected.epidemiologiaObitos.genero : null)
  }

  private setStatusCases() {

    this.dataStatusCases = [
      { name: "Recuperados", value: this.countCasosRecuperados },
      { name: "Ativos", value: this.countCasosAtivos },
      { name: "Óbitos", value: this.countObitos },
    ]

  }

  //
  private setCasesDataByAge(data: GraphData[]): void {

    if (data) {

      this.casesByAge = data

      this.hasCasesByAge = true

    } else {

      this.casesByAge = []

      this.hasCasesByAge = false

    }

  }

  //
  private setObitosDataByAge(data: GraphData[]): void {

    if (data) {

      this.obitosByAge = data

      this.hasObitosByAge = true

    } else {

      this.obitosByAge = []

      this.hasObitosByAge = false

    }

  }

  //
  private setObitosDataByGender(data: GraphData[]): void {

    if (data) {

      this.obitosByGender = data

      this.hasObitosByGender = true

    } else {

      this.obitosByGender = []

      this.hasObitosByGender = false

    }

  }

  //
  private setCasesDataByGender(data: GraphData[]): void {

    if (data) {

      this.casesByGender = data

      this.hasCasesByGender = true

    } else {

      this.casesByAge = []

      this.hasCasesByGender = false

    }

  }

  //
  private getDadosCasosPorDia(array: EstadoResult[]): void {

    this.dadosCasosDia = []

    let lenght = array.length

    for (let index = lenght - 1; index >= 0; index--) {

      this.dadosCasosDia.push({
        name: array[index].last_available_date,
        value: array[index].new_confirmed
      })

    }

  }

  //
  private getDadosCasosAcumulados(array: EstadoResult[]): void {

    this.dadosCasosAcumulados = []

    let lenght = array.length

    for (let index = lenght - 1; index >= 0; index--) {

      this.dadosCasosAcumulados.push({
        name: array[index].last_available_date,
        value: array[index].last_available_confirmed
      })

    }

  }

  //
  private getDadosObitosPorDia(array: EstadoResult[]): void {

    this.dadosObitosDia = []

    let lenght = array.length

    for (let index = lenght - 1; index >= 0; index--) {

      this.dadosObitosDia.push({
        name: array[index].last_available_date,
        value: array[index].new_deaths
      })

    }

  }

  //
  private getDadosObitosAcumulados(array: EstadoResult[]): void {

    this.dadosObitosAcumulados = []

    let lenght = array.length

    for (let index = lenght - 1; index >= 0; index--) {

      this.dadosObitosAcumulados.push({
        name: array[index].last_available_date,
        value: array[index].last_available_deaths
      })

    }

  }

  //
  public setDataPordia(): void {

    this.loadingCasos = true

    this.dadosCasos = this.dadosCasosDia

    setTimeout(() => {
      this.loadingCasos = false
    }, 200)

  }

  //
  public setDataAcumulado(): void {

    this.loadingCasos = true

    this.dadosCasos = this.dadosCasosAcumulados

    setTimeout(() => {
      this.loadingCasos = false
    }, 200)
  }

  //
  public setObitosPordia(): void {

    this.loadingObitos = true

    this.dadosObitos = this.dadosObitosDia

    setTimeout(() => {
      this.loadingObitos = false
    }, 200)

  }

  //
  public setObitosAcumulados(): void {

    this.loadingObitos = true

    this.dadosObitos = this.dadosObitosAcumulados

    setTimeout(() => {
      this.loadingObitos = false
    }, 200)

  }

}

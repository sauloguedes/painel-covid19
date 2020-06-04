import { Component, OnInit } from '@angular/core';
import { cases } from './data/casesAcumulados';
import { casesPorDia } from './data/casesPorDia';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  public dadosCasos = [];

  public view: any[] = [];

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


  // Gráficos de Distribuição de casos por sexo
  colorSchemeCasesByGender = {
    domain: ['#97CBEC', '#F7ABD5']
  }
  casesByGender = [
    {
      "name": "Masculino",
      "value": 60
    },
    {
      "name": "Feminino",
      "value": 40
    }
  ]

  // Gráficos de Distribuição por idade
  casesByAge = [
    {
      "name": "0 - 9 anos",
      "value": 1
    },
    {
      "name": "10 - 19 anos",
      "value": 2
    },
    {
      "name": "20 - 29 anos",
      "value": 3
    },
    {
      "name": "30 - 39 anos",
      "value": 4
    },
    {
      "name": "40 - 49 anos",
      "value": 5
    },
    {
      "name": "50 - 59 anos",
      "value": 6
    },
    {
      "name": "60 - 69 anos",
      "value": 7
    },
    {
      "name": "70 +",
      "value": 8
    }
  ]
  colorSchemeCasesByAge = {
    domain: ['#5AA454']
  };

  constructor() { }

  ngOnInit(): void {

    this.setDataAcumulado()

  }

  setDataAcumulado(): void {
    this.dadosCasos = cases
  }

  setDataPordia(): void {
    this.dadosCasos = casesPorDia
  }

}

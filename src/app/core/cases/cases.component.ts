import { Component, OnInit } from '@angular/core';
import { cases } from './data/casesAcumulados';
import { casesPorDia } from './data/casesPorDia';
import { casesByGenderAndAge } from './data/casesByGenderAndAge';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  public countCasos: number = 584016

  public countCasosMasculinos: number = 0

  public countCasosFemininos: number = 0

  public countSragHospitalizados: number = 0

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

  public casesByGender: any[] = []

  // Gráficos de Distribuição por idade
  public casesByAge: any[] = []

  colorSchemeCasesByAge = {
    domain: ['#5AA454']
  };

  constructor() { }

  ngOnInit(): void {

    this.setDataPordia()

    this.setDataByAge()

    this.setCasesByGender()

  }

  setDataByAge(): void {

    let cases = casesByGenderAndAge

    cases.forEach(c => {

      let sum = c.qtd_homens + c.qtd_mulheres

      this.casesByAge.push({ "name": c.name, "value": sum })

      this.countSragHospitalizados += sum
    })

  }

  setCasesByGender(): void {

    let cases = casesByGenderAndAge

    cases.forEach(c => {
      this.countCasosMasculinos += c.qtd_homens
      this.countCasosFemininos += c.qtd_mulheres
    })

    this.casesByGender = [
      { "name": "Masculino", "value": this.countCasosMasculinos },
      { "name": "Feminino", "value": this.countCasosFemininos }
    ]

  }

  setDataAcumulado(): void {

    this.dadosCasos = cases

  }

  setDataPordia(): void {

    this.dadosCasos = casesPorDia

  }

}

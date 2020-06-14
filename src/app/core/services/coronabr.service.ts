import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CoronaRequest } from '../models/CoronaBrRequest';

@Injectable({
  providedIn: 'root'
})
export class CoronaBrService {

  // private url = 'https://brasil.io/api/dataset/covid19/caso_full/data/?search=&epidemiological_week=&date=&order_for_place=&state=MA&city=&city_ibge_code=&place_type=state&last_available_date=&is_last=&is_repeated=';
  private url = 'https://brasil.io/api/dataset/covid19/caso_full/data/';

  constructor(
    private httpClient: HttpClient
  ) { }

  //
  public getData(uf: string): Observable<CoronaRequest> {
    return this.httpClient.get<CoronaRequest>(this.url, {
      params: new HttpParams()
        .set("search", "")
        .set("epidemiological_week", "")
        .set("date", "")
        .set("order_for_place", "")
        .set("state", uf)
        .set("city", "")
        .set("city_ibge_code", "")
        .set("place_type", "state")
        .set("last_available_date", "")
        .set("is_last", "")
        .set("is_repeated", "")
    })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

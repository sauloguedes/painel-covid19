export interface CoronaRequest {
  "count": number,
  "next": any,
  "previous": any,
  "results": EstadoResult[]
}

export interface EstadoResult {
  "city": string,
  "city_ibge_code": number,
  "date": string,
  "epidemiological_week": number,
  "estimated_population_2019": number,
  "is_last": boolean,
  "is_repeated": boolean,
  "last_available_confirmed": number,
  "last_available_confirmed_per_100k_inhabitants": number,
  "last_available_date": string,
  "last_available_death_rate": number,
  "last_available_deaths": number,
  "new_confirmed": number,
  "new_deaths": number,
  "order_for_place": number,
  "place_type": string,
  "state": string
}

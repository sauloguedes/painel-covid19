export interface Estado {
  nome: string,
  uf: string,
  populacao: string,
  recuperados: number,
  codigoIbge: string,
  epidemiologiaCasos?: {
    idade?: [{
      name: string,
      value: number
    }],
    genero?: [{
      name: string,
      value: number
    }]
  },
  epidemiologiaObitos?: {
    idade?: [{
      name: string,
      value: number
    }],
    genero?: [{
      name: string,
      value: number
    }]
  }
}

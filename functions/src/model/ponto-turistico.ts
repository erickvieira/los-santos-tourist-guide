import { CategoriaPontoTuristico } from './categoria-ponto-turistico';
import { Acessibilidade } from './acessibilidade';
import { HorarioFuncionamento } from './horario-funcionamento';
import { Coordenadas } from './coordenadas';
import { Avaliacao } from './avaliacao';
import { FaixaEtaria } from './faixa-etaria';

export interface PontoTuristico {
  id: string,
  nome: string
  descricao: string
  ruasAdjacentes: string[]
  fotos?: string[]
  icone: string
  capacidade?: number
  precoEntrada: number
  aceitaPet?: boolean
  permiteFotografia?: boolean
  temDetectorDeMetais?: boolean
  categorias: CategoriaPontoTuristico[]
  itensAcessibilidade?: Acessibilidade[]
  horariosFunctionamento: HorarioFuncionamento[]
  coordenadas: Coordenadas
  avaliacoes?: Avaliacao[]
  faixasEtarias?: FaixaEtaria[]
}

export interface PPontoTuristico {
  nome: string
  descricao: string
  ruasAdjacentes: string[]
  fotos?: string[]
  icone: string
  capacidade?: number
  precoEntrada: number
  aceitaPet?: boolean
  permiteFotografia?: boolean
  temDetectorDeMetais?: boolean
  categorias: CategoriaPontoTuristico[]
  itensAcessibilidade?: Acessibilidade[]
  horariosFunctionamento: HorarioFuncionamento[]
  coordenadas: Coordenadas
  avaliacoes?: Avaliacao[]
  faixasEtarias?: FaixaEtaria[]
}
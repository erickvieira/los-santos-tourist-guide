import { CategoriaPontoTuristico } from './categoria-ponto-turistico';
import { Acessibilidade } from './acessibilidade';
import { HorarioFuncionamento } from './horario-funcionamento';
import { Coordenadas } from './coordenadas';
import { Avaliacao } from './avaliacao';
import { FaixaEtaria } from './faixa-etaria';
import { FirebaeObjectReference } from './firebase-object-reference';

export type PontoTuristico = IPontoTuristico & FirebaeObjectReference

export interface IPontoTuristico {
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
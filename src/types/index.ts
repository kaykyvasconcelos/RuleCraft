// src/types/index.ts

export type TipoValor = 'percentual' | 'real';

export interface Rule {
  id: string;
  nome: string;
  tipo: TipoValor;
  valor: number;
}

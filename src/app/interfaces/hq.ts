import { Artist } from './artist';

export interface Hq {
  id?: string;
  titulo?: string;
  preview?: string;
  medidas?: string;
  paginas?: number;
  valor?: number;
  capa?: string;
  genero?: string;
  artists?: Artist[];
  idartists?: string[];
  userid?: string;
}


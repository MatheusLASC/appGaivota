import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

export interface Artist{
  id: number;
  name: string;
  nameArtist: string;
  CPF: string;
  city: string;
  state: string; // o que usa pra tipo char?
  biography: string;
  // Foto e Modal de Redes precisam ser adicionadas
}

const ITEMS_KEY = 'my-artists';

@Injectable({
  providedIn: 'root'
})


export class ArtistService {

  constructor(private storage: Storage) {}

  addItem(artist: Artist): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((artists: Artist[]) => {
      if (artists)
      {
        artists.push(artist);
        return this.storage.set(ITEMS_KEY, artists);
      }
      else
      {
        return this.storage.set(ITEMS_KEY, [artist]);
      }
  });
  }

  getArtists(): Promise<Artist[]>{
    return this.storage.get(ITEMS_KEY);
  }

}

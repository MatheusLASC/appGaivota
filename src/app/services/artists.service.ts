import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Artist } from '../interfaces/artist';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private artistsCollection: AngularFirestoreCollection<Artist>;

  constructor(private afs: AngularFirestore) {
    this.artistsCollection = this.afs.collection<Artist>('Artists');
   }

   getArtists(){
    return this.artistsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addArtist(artist: Artist) {
    return this.artistsCollection.add(artist);
  }

  getArtist(id: string) {
    return this.artistsCollection.doc<Artist>(id).valueChanges();
  }

  updateArtist(id: string, artist: Artist) {
    return this.artistsCollection.doc<Artist>(id).update(artist);
  }

   }


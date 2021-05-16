import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Hq } from '../interfaces/hq';

@Injectable({
  providedIn: 'root'
})
export class HqsService {
  private hqsCollection: AngularFirestoreCollection<Hq>;

  constructor(private afs: AngularFirestore) {
    this.hqsCollection = this.afs.collection<Hq>('Hqs');
  }

  getHqs(){
    return this.hqsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addHq(hq: Hq) {
    return this.hqsCollection.add(hq);
  }

  getHq(id: string) {
    return this.hqsCollection.doc<Hq>(id).valueChanges();
  }

  updateHq(id: string, hq: Hq) {
    return this.hqsCollection.doc<Hq>(id).update(hq);
  }

}

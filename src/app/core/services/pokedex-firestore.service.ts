import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  collection,
} from '@firebase/firestore';
import { Firestore, collectionData, docData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/features/interfaces/Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokedexFirestoreService {
  private pokemonCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.pokemonCollection = collection(this.firestore, 'pokemon')
  }

  getAll() {
    return collectionData(this.pokemonCollection, {
      idField: 'id',
    }) as Observable<Pokemon[]>;
  }

  get(id: string) {
    const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
    return docData(pokemonDocumentReference, { idField: 'id' });
  }

  create(pokemon: Pokemon) {
    return addDoc(this.pokemonCollection, pokemon);
  }

  update(pokemon: Pokemon) {
    const pokemonDocumentReference = doc(
      this.firestore,
      `pokemon/${pokemon.id}`
    );
    return updateDoc(pokemonDocumentReference, { ...pokemon });
  }

  delete(id: string) {
    const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
    return deleteDoc(pokemonDocumentReference);
  }
}

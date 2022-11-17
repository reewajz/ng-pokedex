import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { PokedexFirestoreService } from 'src/app/core/services/pokedex-firestore.service';
import { Pokemon } from '../interfaces/Pokemon';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon$!: Observable<Array<Pokemon>>;
  selectedPokemon?: Pokemon;
  destroyed$ = new Subject<void>();

  constructor(private readonly pokedexFirestoreService: PokedexFirestoreService,
    private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemon$ = this.pokedexFirestoreService.getAll();
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  addPokemon() {
    const dialogRef = this.matDialog.open(FormComponent,
      {
        data: {},
        width: '40%'
      }
    );

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.pokedexFirestoreService.create(pokemon)),
        takeUntil(this.)
      )
      .subscribe();
  }

  updatePokemon() {
    const dialogRef = this.matDialog.open(FormComponent,
      {
        data: { ...this.selectedPokemon },
        width: '40%'
      })

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      tap((pokemon: Pokemon) => this.pokedexFirestoreService.update(pokemon)),
      tap((pokemon: Pokemon) => this.selectPokemon(pokemon))
    ).subscribe();
  }

  deletePokemon() {
    this.pokedexFirestoreService.delete(this.selectedPokemon!.id);
    this.selectedPokemon = undefined;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}

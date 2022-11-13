import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, tap } from 'rxjs';
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
  selectedPokemon!: Pokemon;

  constructor(private readonly pokedexFirestoreService: PokedexFirestoreService,
    private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemon$ = this.pokedexFirestoreService.getAll();
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
        tap((pokemon) => this.pokedexFirestoreService.create(pokemon))
      )
      .subscribe();



  }

}

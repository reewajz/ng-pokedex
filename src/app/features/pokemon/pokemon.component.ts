import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PokedexFirestoreService } from 'src/app/core/services/pokedex-firestore.service';
import { Pokemon } from '../interfaces/Pokemon';

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

}

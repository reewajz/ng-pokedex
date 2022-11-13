import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/features/interfaces/Pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Output() updatePokemon: EventEmitter<string> = new EventEmitter();
  @Output() deletePokemon: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  update() {
    this.updatePokemon.emit();
  }

  delete() {
    this.deletePokemon.emit();
  }

}
